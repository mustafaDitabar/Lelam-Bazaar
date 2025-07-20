import React, { useEffect, useState } from "react";
import AdCard from "./Add";
import { FaTrash } from "react-icons/fa";
import { useAuthContext } from "../../../context/AuthContext";
import {
  ChevronUpDownIcon,
  CheckIcon,
  ArrowPathIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { Listbox } from "@headlessui/react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const provinces = [
  "کابل", "هرات", "قندهار", "مزارشریف", "ننگرهار", "بلخ", "کندز", "غزنی",
  "بدخشان", "پروان", "لغمان", "پکتیا", "هلمند", "بغلان", "کاپیسا", "فراه",
  "تخار", "زابل", "لوگر", "فاریاب", "بامیان", "وردک", "خوست", "نورستان",
  "اروزگان", "دایکندی", "پنجشیر", "سمنگان", "جوزجان", "سرپل", "بادغیس", "غور", "نیمروز"
];

const AllAdd = () => {
  const [ads, setAds] = useState([]);
  const { auth } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [provense, setProvense] = useState(null);
  const [editAd, setEditAd] = useState(null);
  const [originalAd, setOriginalAd] = useState(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAdTitle, setSelectedAdTitle] = useState("");
  const [selectedAdId, setSelectedAdId] = useState(null);

  const handleCloseEdit = () => {
    setEditAd(null);
    setCategory("");
    setProvense(null);
  };

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const userId = auth?.userInfo?._id; 
                console.log(userId,"آیدی کاربر");

      const response = await axiosPrivate.get(`/api/adds-Users/${userId}`, {
       headers: { Authorization: `Bearer ${auth?.accessToken}` },

          withCredentials: true,
        });
        setAds(response.data);
      } catch (error) {
        console.error("خطا در گرفتن آگهی‌ها:", error);
      } finally {
        setLoading(false);
      }
    };
    if (auth?.accessToken) fetchAds();
  }, [auth, axiosPrivate]);

  useEffect(() => {
    if (editAd) {
      setProvense(editAd.location || "");

      const fetchCategories = async () => {
        try {
          const res = await axiosPrivate.get("/api/categories");
          const catTitles = res.data.map((cat) => cat.title);
          setCategories(catTitles);

          const selectedCategory =
            typeof editAd.category === "object"
              ? editAd.category.title
              : editAd.category;

          if (catTitles.includes(selectedCategory)) {
            setCategory(selectedCategory);
          } else if (catTitles.length > 0) {
            setCategory(catTitles[0]);
          } else {
            setCategory("");
          }
        } catch (err) {
          console.error("خطا در گرفتن دسته‌بندی‌ها:", err);
        }
      };

      fetchCategories();
    }
  }, [editAd, axiosPrivate]);

  const handleEdit = (id) => {
    const selectedAd = ads.find((ad) => ad._id === id);
    if (selectedAd) {
      setEditAd({ ...selectedAd });
      setOriginalAd({ ...selectedAd });
    }
  };

  const handleDeleteRequest = (id, title) => {
    setSelectedAdId(id);
    setSelectedAdTitle(title);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axiosPrivate.delete(`/api/adds-ADMIN/${selectedAdId}`, {
        headers: { Authorization: `Bearer ${auth?.accessToken}` },
      });
      setAds((prev) => prev.filter((ad) => ad._id !== selectedAdId));
    } catch (err) {
      console.error("خطا در حذف آگهی:", err);
    } finally {
      setShowDeleteModal(false);
      setSelectedAdId(null);
      setSelectedAdTitle("");
    }
  };

  const handleAddNewImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !editAd) return;

    const previewUrl = URL.createObjectURL(file);

    setEditAd((prev) => ({
      ...prev,
      imagesURLs: [...prev.imagesURLs, previewUrl],
    }));

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axiosPrivate.post(
        `/api/adds-A/upload-image/${editAd._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newImageUrl = response.data.imageUrl;

      setEditAd((prev) => ({
        ...prev,
        imagesURLs: [...prev.imagesURLs.slice(0, -1), newImageUrl + `?t=${Date.now()}`],
      }));

      URL.revokeObjectURL(previewUrl);
    } catch (err) {
      console.error("خطا در آپلود عکس جدید:", err);
      setEditAd((prev) => ({
        ...prev,
        imagesURLs: prev.imagesURLs.slice(0, -1),
      }));
    }
  };

  const handleUpdateAd = async (updatedData) => {
    try {
      await axiosPrivate.put(`/api/adds-A/${updatedData._id}`, updatedData, {
        headers: { Authorization: `Bearer ${auth?.accessToken}` },
      });
      setAds((prev) =>
        prev.map((ad) => (ad._id === updatedData._id ? updatedData : ad))
      );
      setEditAd(null);
      setCategory("");
      setProvense(null);
    } catch (error) {
      console.error("خطا در بروزرسانی آگهی:", error);
    }
  };

  const handleDeleteImage = async (index) => {
    if (!editAd) return;
    const removedImage = editAd.imagesURLs[index];
    const updatedImages = [...editAd.imagesURLs];
    updatedImages.splice(index, 1);
    setEditAd({ ...editAd, imagesURLs: updatedImages });

    try {
      await axiosPrivate.put(
        `/api/adds-A/remove-image/${editAd._id}`,
        { imageUrl: removedImage },
        {
          headers: { Authorization: `Bearer ${auth?.accessToken}` },
        }
      );
    } catch (err) {
      console.error("خطا در حذف عکس:", err);
    }
  };

  const handleReplaceImage = async (e, index) => {
    if (!editAd) return;
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setEditAd((prev) => {
      const updatedImages = [...prev.imagesURLs];
      updatedImages[index] = previewUrl;
      return { ...prev, imagesURLs: updatedImages };
    });

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axiosPrivate.post(
        `/api/adds-A/upload-image/${editAd._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newImageUrl = response.data.imageUrl;

      setEditAd((prev) => {
        const updatedImages = [...prev.imagesURLs];
        updatedImages[index] = newImageUrl + `?t=${Date.now()}`;
        return { ...prev, imagesURLs: updatedImages };
      });

      URL.revokeObjectURL(previewUrl);
    } catch (err) {
      console.error("خطا در آپلود عکس جدید:", err);
      setEditAd((prev) => {
        const updatedImages = [...prev.imagesURLs];
        updatedImages.splice(index, 1);
        return { ...prev, imagesURLs: updatedImages };
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center dark:text-colorwhite1 dark:bg-blackbg h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>



      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4">
        {ads.map((item) => (
          <AdCard
            key={item._id}
            id={item._id}
            image={item.imagesURLs?.[0]}
            name={item.title}
            price={item.price}
            location={item.location}
            date={item.createdAt}
            onDelete={() => handleDeleteRequest(item._id, item.title)}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {/* پاپ‌آپ تأیید حذف */}
      {showDeleteModal && (
        <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg dark:bg-myColor shadow-lg p-6 w-80 text-center">
            <div className="flex items-center gap-1 mb-1 justify-start text-left">
              <FaTrash className="text-blue-500" />
              <h2 className="font-semibold text-right dark:text-colorwhite">حذف آگهی</h2>
            </div>

            <p className="text-sm text-gray-600 text-right dark:text-colorwhite1 mb-4">
              آیا مطمئن هستید که می‌خواهید آگهی{" "}
              <span className="font-bold">{selectedAdTitle}</span> را حذف کنید؟
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-200 border px-4 py-1 dark:text-colorwhite dark:bg-colorfieldbg rounded-lg h-[35px] w-[70px] hover:border-blue-400"
              >
                لغو
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg h-[35px] w-[70px] hover:bg-blue-600"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* مودال ویرایش آگهی */}
{editAd && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-[67px] z-50">
    <div className="relative bg-white rounded-lg pl-8 pr-9 dark:bg-myColor pb-8 pt-2 w-full max-w-2xl overflow-y-auto max-h-[85vh]">
      <div
        onClick={handleCloseEdit}
        className="absolute top-2 left-2 h-[30px] w-[30px] flex hover:bg-red-400 items-center justify-center rounded-md cursor-pointer"
      >
        <span className="text-gray-700 text-2xl leading-none">×</span>
      </div>

      <h2 className="text-xl font-bold mb-4 text-right">ویرایش آگهی</h2>

            {/* عنوان */}
            <div className="flex items-center mb-2">
              <label className="w-[130px] text-right text-gray-600">عنوان آگهی :</label>
              <input
                type="text"
                value={editAd.title}
                onChange={(e) => setEditAd({ ...editAd, title: e.target.value })}
                className="flex flex-col p-2 w-[760px] border rounded"
              />
            </div>

            {/* ولایت */}
            <div className="flex items-center mb-2">
              <label className="w-[130px] text-right text-gray-600">انتخاب ولایت :</label>
              <div className="flex-1">
                <Listbox value={provense} onChange={setProvense}>
                  <div className="relative">
                    <Listbox.Button className="w-[503px] h-[38px] rounded bg-gray-100 border p-2 text-right flex justify-between items-center">
                      <span className="truncate">{provense || "انتخاب ولایت"}</span>
                      <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute w-full bg-white rounded shadow z-10 mt-1 max-h-60 overflow-auto">
                      {provinces.map((prov) => (
                        <Listbox.Option
                          key={prov}
                          value={prov}
                          className={({ active }) =>
                            `cursor-pointer select-none p-2 ${active ? "bg-blue-100" : ""}`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span className={selected ? "font-medium" : ""}>{prov}</span>
                              {selected && (
                                <CheckIcon className="w-4 h-4 inline text-blue-500 ml-2" />
                              )}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
            </div>

            {/* دسته‌بندی */}
            <div className="flex items-center gap-[4px] mb-2">
              <label className="w-[130px] text-right text-gray-600">دسته‌بندی:</label>
              <div className="flex-1">
                <Listbox value={category} onChange={setCategory}>
                  <div className="relative">
                    <Listbox.Button className="w-[503px] h-[38px] rounded bg-gray-100 border p-2 text-right flex justify-between items-center">
                      <span className="truncate">{category || "انتخاب دسته‌بندی"}</span>
                      <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute w-full bg-white rounded shadow z-10 mt-1 max-h-60 overflow-auto">
                      {categories.map((cat) => (
                        <Listbox.Option
                          key={cat}
                          value={cat}
                          className={({ active }) =>
                            `cursor-pointer select-none p-2 ${active ? "bg-blue-100" : ""}`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span className={selected ? "font-medium" : ""}>{cat}</span>
                              {selected && (
                                <CheckIcon className="w-4 h-4 inline text-blue-500 ml-2" />
                              )}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
            </div>

            {/* توضیحات */}
            <div className="flex items-start mb-2">
              <label className="text-right w-[120px] text-gray-600 mt-2">توضیحات:</label>
              <textarea
                value={editAd.description}
                onChange={(e) => setEditAd({ ...editAd, description: e.target.value })}
                className="flex p-2 border w-[700px] rounded max-h-[40px] min-h-[40px]"
              />
            </div>

            {/* قیمت */}
            <div className="flex items-center mb-2">
              <label className="text-right w-[86px] text-gray-600">قیمت:</label>
              <input
                type="number"
                value={editAd.price}
                onChange={(e) => setEditAd({ ...editAd, price: e.target.value })}
                className="flex-1 p-2 border w-[800px] rounded"
              />
            </div>

            {/* شماره تماس */}
            <div className="flex items-center gap-[4px] mb-2">
              <label className="w-[81px] text-right text-gray-600">شماره تماس :</label>
              <input
                type="text"
                value={editAd.phoneNumber}
                onChange={(e) => setEditAd({ ...editAd, phoneNumber: e.target.value })}
                className="flex-1 p-2 border w-[800px] rounded"
              />
            </div>

            {/* عکس‌ها */}
            {editAd.imagesURLs?.length > 0 && (
              <div className="mt-4">


                
                <h3 className="font-semibold mb-2 text-right">عکس‌های آگهی:</h3>



                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {editAd.imagesURLs.map((img, index) => {
                    const imageUrl = img.startsWith("blob:")
                     ? img
                     : img.startsWith("http")
                     ? img
                    : `http://localhost:3500/uploads/${img}?t=${Date.now()}`;

                    return (

                      
                      <div
                        key={index}
                        className="relative group border rounded overflow-hidden"
                      >

                        
                        <img
                          src={imageUrl}
                          alt={`تصویر ${index + 1}`}
                          className="w-full h-[150px] object-cover"
                        />

                        {/* دکمه حذف عکس */}
                        <button
                          onClick={() => handleDeleteImage(index)}
                          className="absolute top-1 left-1 bg-white rounded-full p-1 shadow hover:bg-red-100"
                          title="حذف عکس"
                        >
                          <FaTrash  className="w-4 h-4 text-red-500" />
                        </button>

                        {/* دکمه تعویض عکس */}
                        <label
                          className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-blue-100 cursor-pointer"
                          title="تعویض عکس"
                        >
                          <ArrowPathIcon className="w-4 h-4 text-blue-500" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleReplaceImage(e, index)}
                          />
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

{/* آیکن افزودن عکس جدید */}
<div className="">
  <label
    htmlFor="add-image-input"
    className="  p-2 rounded-full flex items-center justify-center"
    title="افزودن عکس جدید"
  >
    <PlusIcon className="w-7 h-7 text-blue-400 cursor-pointer" /> <label>عکس جدید انتخاب کنید</label>
  </label>
  <input
    id="add-image-input"
    type="file"
    accept="image/*"
    onChange={handleAddNewImage}
    className="hidden"
  />
</div>



            {/* دکمه‌ها */}
            <div className="flex justify-end gap-5 mt-4">
              <button
                onClick={() => {
                  setEditAd({ ...originalAd });
                  setCategory(originalAd.category || "");
                  setProvense(originalAd.location || "");
                }}
                className="bg-gray-100 border text-gray-700 px-4 py-2 rounded-lg hover:border-blue-500"
              >
                لغو تغییرات
              </button>

              <button
                onClick={() =>
                  handleUpdateAd({ 
                    ...editAd,
                    category,
                    location: provense,
                  })
                }
                className="bg-blue-400 text-white px-4 py-2 hover:bg-blue-500 rounded-lg"
              >
                ذخیره تغییرات
              </button>
            </div>
          </div>
       
        </div>
      )}
   
    </>
  );
};

export default AllAdd;



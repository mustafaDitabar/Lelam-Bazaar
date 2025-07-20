
const mongoose =require("mongoose")
const dayjs =require("dayjs")
const utc =require("dayjs/plugin/utc.js")
const timezone =require("dayjs/plugin/timezone.js")

dayjs.extend(utc);
dayjs.extend(timezone);

const provincesOfAfghanistan = [
  'کابل', 'هرات', 'قندهار', 'مزارشریف', 'ننگرهار',
  'بلخ', 'کندز', 'غزنی', 'بدخشان', 'پروان',
  'لغمان', 'پکتیا', 'هلمند', 'بغلان', 'کاپیسا',
  'فراه', 'تخار', 'زابل', 'لوگر', 'فاریاب',
  'بامیان', 'وردک', 'خوست', 'نورستان', 'اروزگان',
  'دایکندی', 'پنجشیر', 'سمنگان', 'جوزجان', 'سرپل',
  'بادغیس', 'غور', 'نیمروز'
];

const afghanistanDateOnly = () => {
  const tzDate = dayjs().tz('Asia/Kabul');
  return new Date(tzDate.year(), tzDate.month(), tzDate.date());
};

const adSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number },

  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^07\d{8}$/.test(v);
      },
      message: props => `${props.value} شماره تلفن معتبر نیست. باید با 07 شروع شود و 10 رقم باشد.`,
    },
  },
  
  imagesURLs: [{ type: String }],

  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  location: {
    type: String,
    enum: provincesOfAfghanistan,
    default: 'کابل',
    required: true,
  },

  createdAt: {
    type: Date,
    default: afghanistanDateOnly,
  },
  isAccepted: { 
    type: Boolean, 
    default: false },
});


const AddProduct = mongoose.model('AddProduct', adSchema);

module.exports=AddProduct
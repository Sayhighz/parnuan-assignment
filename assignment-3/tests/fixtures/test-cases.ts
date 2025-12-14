import { Category } from '../../src/types';

export interface TestCase {
  description: string;
  expected: Category;
}

export const testCases: TestCase[] = [
  // ==================== FOOD ====================
  // Thai - General
  { description: 'กาแฟ Cafe Amazon', expected: 'food' },
  { description: 'ข้าวมันไก่', expected: 'food' },
  { description: 'ก๋วยเตี๋ยวเรือ', expected: 'food' },
  { description: 'ส้มตำ ไก่ย่าง', expected: 'food' },
  { description: 'ชานมไข่มุก', expected: 'food' },
  { description: 'ขนมปัง เบเกอรี่', expected: 'food' },
  { description: 'ผลไม้รวม', expected: 'food' },
  { description: 'ไอศกรีม', expected: 'food' },
  { description: 'อาหารเช้า', expected: 'food' },
  { description: 'อาหารกลางวัน', expected: 'food' },
  { description: 'อาหารเย็น', expected: 'food' },
  { description: 'ของว่าง', expected: 'food' },
  
  // Thai - Brands & Stores
  { description: 'จ่าย MK สุกี้', expected: 'food' },
  { description: 'ชำระ Pizza Hut', expected: 'food' },
  { description: 'KFC ไก่ทอด', expected: 'food' },
  { description: 'แมคโดนัลด์', expected: 'food' },
  { description: 'Burger King วอปเปอร์', expected: 'food' },
  { description: 'Bar B Q Plaza', expected: 'food' },
  { description: 'Shabushi บุฟเฟ่ต์', expected: 'food' },
  { description: 'Yayoi อาหารญี่ปุ่น', expected: 'food' },
  { description: 'Fuji Restaurant', expected: 'food' },
  { description: 'Bonchon ไก่เกาหลี', expected: 'food' },
  { description: 'After You ขนมหวาน', expected: 'food' },
  { description: 'S&P เค้ก', expected: 'food' },
  { description: 'Sizzler สเต็ก', expected: 'food' },
  
  // Thai - Convenience Stores & Supermarkets
  { description: 'เซเว่น 7-ELEVEN', expected: 'food' },
  { description: 'ชำระค่าสินค้า 7-ELEVEN', expected: 'food' },
  { description: 'Family Mart', expected: 'food' },
  { description: 'โลตัส ซื้อของ', expected: 'food' },
  { description: 'บิ๊กซี ซุปเปอร์มาร์เก็ต', expected: 'food' },
  { description: 'Tops Supermarket', expected: 'food' },
  { description: 'แม็คโคร ของกิน', expected: 'food' },
  { description: 'Gourmet Market', expected: 'food' },
  
  // Thai - Food Delivery
  { description: 'Grab Food ค่าอาหาร', expected: 'food' },
  { description: 'LINE MAN สั่งอาหาร', expected: 'food' },
  { description: 'Foodpanda delivery', expected: 'food' },
  { description: 'Robinhood อาหาร', expected: 'food' },
  
  // English - General
  { description: 'Coffee Starbucks', expected: 'food' },
  { description: 'lunch at restaurant', expected: 'food' },
  { description: 'dinner with friends', expected: 'food' },
  { description: 'breakfast meal', expected: 'food' },
  { description: 'snack and drinks', expected: 'food' },
  { description: 'dessert cafe', expected: 'food' },
  { description: 'boba milk tea', expected: 'food' },
  
  // SMS Banking Format - Food
  { description: 'POS 7-ELEVEN 89.00', expected: 'food' },
  { description: 'PURCHASE STARBUCKS TH', expected: 'food' },
  
  // ==================== TRANSPORT ====================
  // Thai - Fuel
  { description: 'เติมน้ำมัน ปตท', expected: 'transport' },
  { description: 'เติมน้ำมัน ปตท สาขาลาดพร้าว', expected: 'transport' },
  { description: 'น้ำมัน Shell', expected: 'transport' },
  { description: 'Esso เติมเต็ม', expected: 'transport' },
  { description: 'Caltex น้ำมัน', expected: 'transport' },
  { description: 'บางจาก ดีเซล', expected: 'transport' },
  { description: 'เติมแก๊ส LPG', expected: 'transport' },
  
  // Thai - Public Transport
  { description: 'ค่ารถไฟฟ้า BTS', expected: 'transport' },
  { description: 'เติมเงิน MRT', expected: 'transport' },
  { description: 'Airport Link สนามบิน', expected: 'transport' },
  { description: 'ค่ารถเมล์', expected: 'transport' },
  { description: 'รถตู้ มีนบุรี', expected: 'transport' },
  
  // Thai - Taxi & Ride-hailing
  { description: 'Grab car เรียกรถ', expected: 'transport' },
  { description: 'GRAB* TRANSPORT', expected: 'transport' },
  { description: 'Bolt taxi', expected: 'transport' },
  { description: 'ค่าแท็กซี่', expected: 'transport' },
  { description: 'มอเตอร์ไซค์รับจ้าง', expected: 'transport' },
  
  // Thai - Tolls & Parking
  { description: 'ค่าทางด่วน', expected: 'transport' },
  { description: 'ทางด่วนดอนเมือง', expected: 'transport' },
  { description: 'Easy Pass เติมเงิน', expected: 'transport' },
  { description: 'ค่าจอดรถ', expected: 'transport' },
  { description: 'ที่จอดรถ สยาม', expected: 'transport' },
  
  // Thai - Vehicle Maintenance
  { description: 'ซ่อมรถ อู่', expected: 'transport' },
  { description: 'ล้างรถ', expected: 'transport' },
  { description: 'เปลี่ยนยาง', expected: 'transport' },
  { description: 'เปลี่ยนน้ำมันเครื่อง', expected: 'transport' },
  { description: 'ค่าต่อภาษีรถ', expected: 'transport' },
  { description: 'ประกันรถยนต์', expected: 'transport' },
  { description: 'ผ่อนรถ งวดที่ 5', expected: 'transport' },
  
  // Thai - Flights
  { description: 'ตั๋วเครื่องบิน AirAsia', expected: 'transport' },
  { description: 'การบินไทย กรุงเทพ-เชียงใหม่', expected: 'transport' },
  { description: 'Nok Air', expected: 'transport' },
  { description: 'Thai Lion Air', expected: 'transport' },
  
  // English - Transport
  { description: 'Gas station', expected: 'transport' },
  { description: 'fuel petrol', expected: 'transport' },
  { description: 'taxi fare', expected: 'transport' },
  { description: 'parking fee', expected: 'transport' },
  { description: 'toll expressway', expected: 'transport' },
  { description: 'car wash', expected: 'transport' },
  { description: 'car repair service', expected: 'transport' },
  
  // SMS Banking Format - Transport
  { description: 'PTT PUBLIC CO 500.00', expected: 'transport' },
  { description: 'SHELL STATION 800.00', expected: 'transport' },
  
  // ==================== UTILITIES ====================
  // Thai - Bills
  { description: 'ค่าไฟฟ้า', expected: 'utilities' },
  { description: 'ค่าไฟ กฟน', expected: 'utilities' },
  { description: 'ค่าไฟฟ้า กฟภ', expected: 'utilities' },
  { description: 'ค่าน้ำประปา', expected: 'utilities' },
  { description: 'ค่าน้ำ กปน', expected: 'utilities' },
  { description: 'ค่าอินเทอร์เน็ต', expected: 'utilities' },
  { description: 'ค่าเน็ตบ้าน', expected: 'utilities' },
  
  // Thai - Phone & Internet Providers
  { description: 'ค่าโทรศัพท์ AIS', expected: 'utilities' },
  { description: 'เติมเงิน DTAC', expected: 'utilities' },
  { description: 'TRUE MONEY PAYMENT', expected: 'utilities' },
  { description: 'ค่ามือถือ True', expected: 'utilities' },
  { description: '3BB อินเทอร์เน็ต', expected: 'utilities' },
  { description: 'TOT ค่าเน็ต', expected: 'utilities' },
  
  // Thai - Housing
  { description: 'ค่าเช่าบ้าน', expected: 'utilities' },
  { description: 'ค่าคอนโด', expected: 'utilities' },
  { description: 'ค่าส่วนกลาง', expected: 'utilities' },
  { description: 'ค่าเช่าห้อง เดือน ธ.ค.', expected: 'utilities' },
  
  // Thai - Insurance
  { description: 'เบี้ยประกันชีวิต', expected: 'utilities' },
  { description: 'ค่าประกันสุขภาพ', expected: 'utilities' },
  
  // Thai - Subscriptions
  { description: 'Netflix รายเดือน', expected: 'utilities' },
  { description: 'Netflix Subscription', expected: 'utilities' },
  { description: 'YouTube Premium', expected: 'utilities' },
  { description: 'Spotify Premium', expected: 'utilities' },
  { description: 'Apple Music', expected: 'utilities' },
  { description: 'Disney+ Hotstar', expected: 'utilities' },
  { description: 'HBO GO', expected: 'utilities' },
  { description: 'iCloud Storage 50GB', expected: 'utilities' },
  { description: 'Google One', expected: 'utilities' },
  
  // English - Utilities
  { description: 'Electricity bill', expected: 'utilities' },
  { description: 'water bill payment', expected: 'utilities' },
  { description: 'internet monthly', expected: 'utilities' },
  { description: 'phone bill', expected: 'utilities' },
  { description: 'mobile top up', expected: 'utilities' },
  { description: 'rent payment', expected: 'utilities' },
  { description: 'insurance premium', expected: 'utilities' },
  
  // ==================== SHOPPING ====================
  // Thai - Clothing
  { description: 'เสื้อผ้า Uniqlo', expected: 'shopping' },
  { description: 'H&M เสื้อยืด', expected: 'shopping' },
  { description: 'Zara กางเกง', expected: 'shopping' },
  { description: 'รองเท้า Nike', expected: 'shopping' },
  { description: 'รองเท้า Adidas', expected: 'shopping' },
  { description: 'กระเป๋า Charles & Keith', expected: 'shopping' },
  
  // Thai - Online Shopping
  { description: 'SHOPEE TH 299.00', expected: 'shopping' },
  { description: 'Shopee สั่งของ', expected: 'shopping' },
  { description: 'Lazada ช้อปปิ้ง', expected: 'shopping' },
  { description: 'JD Central', expected: 'shopping' },
  
  // Thai - Department Stores
  { description: 'Central Online', expected: 'shopping' },
  { description: 'Robinson ซื้อของ', expected: 'shopping' },
  { description: 'The Mall ช้อป', expected: 'shopping' },
  { description: 'Siam Paragon', expected: 'shopping' },
  { description: 'Terminal 21', expected: 'shopping' },
  { description: 'MBK Center', expected: 'shopping' },
  
  // Thai - Electronics
  { description: 'Power Buy เครื่องใช้ไฟฟ้า', expected: 'shopping' },
  { description: 'Banana IT มือถือ', expected: 'shopping' },
  { description: 'IT City คอมพิวเตอร์', expected: 'shopping' },
  { description: 'ซื้อ iPhone', expected: 'shopping' },
  { description: 'ซื้อ Macbook', expected: 'shopping' },
  
  // Thai - Cosmetics & Personal Care
  { description: 'Watsons เครื่องสำอาง', expected: 'shopping' },
  { description: 'Boots ของใช้', expected: 'shopping' },
  { description: 'EVEANDBOY makeup', expected: 'shopping' },
  { description: 'Sephora น้ำหอม', expected: 'shopping' },
  
  // Thai - Furniture & Home
  { description: 'IKEA เฟอร์นิเจอร์', expected: 'shopping' },
  { description: 'Index Living Mall', expected: 'shopping' },
  { description: 'HomePro ของแต่งบ้าน', expected: 'shopping' },
  
  // English - Shopping
  { description: 'Nike shoes', expected: 'shopping' },
  { description: 'clothes shopping', expected: 'shopping' },
  { description: 'new laptop', expected: 'shopping' },
  { description: 'electronics purchase', expected: 'shopping' },
  { description: 'furniture store', expected: 'shopping' },
  { description: 'cosmetics makeup', expected: 'shopping' },
  { description: 'jewelry store', expected: 'shopping' },
  { description: 'watch purchase', expected: 'shopping' },
  
  // ==================== HEALTHCARE ====================
  // Thai - Hospital & Clinic
  { description: 'รพ.กรุงเทพ ค่ารักษา', expected: 'healthcare' },
  { description: 'โรงพยาบาลบำรุงราษฎร์', expected: 'healthcare' },
  { description: 'ค่าหมอ คลินิก', expected: 'healthcare' },
  { description: 'ค่ารักษาพยาบาล', expected: 'healthcare' },
  { description: 'นัดหมอฟัน คลินิก', expected: 'healthcare' },
  { description: 'ทำฟัน จัดฟัน', expected: 'healthcare' },
  { description: 'ตรวจสุขภาพ ประจำปี', expected: 'healthcare' },
  { description: 'ตรวจตา ทำแว่น', expected: 'healthcare' },
  
  // Thai - Pharmacy & Medicine
  { description: 'ร้านยา Fascino', expected: 'healthcare' },
  { description: 'ซื้อยา Boots', expected: 'healthcare' },
  { description: 'Watsons ยา', expected: 'healthcare' },
  { description: 'ค่ายา ร้านขายยา', expected: 'healthcare' },
  { description: 'วิตามิน อาหารเสริม', expected: 'healthcare' },
  
  // Thai - Fitness & Wellness
  { description: 'Fitness First ค่าสมาชิก', expected: 'healthcare' },
  { description: 'Virgin Active gym', expected: 'healthcare' },
  { description: 'Jetts Fitness', expected: 'healthcare' },
  { description: 'Anytime Fitness', expected: 'healthcare' },
  { description: 'ค่ายิม รายเดือน', expected: 'healthcare' },
  { description: 'สปา นวดแผนไทย', expected: 'healthcare' },
  { description: "Let's Relax Spa", expected: 'healthcare' },
  { description: 'Health Land นวด', expected: 'healthcare' },
  
  // English - Healthcare
  { description: 'Medical checkup', expected: 'healthcare' },
  { description: 'hospital bill', expected: 'healthcare' },
  { description: 'dentist appointment', expected: 'healthcare' },
  { description: 'pharmacy medicine', expected: 'healthcare' },
  { description: 'vitamin supplements', expected: 'healthcare' },
  { description: 'gym membership', expected: 'healthcare' },
  { description: 'spa massage', expected: 'healthcare' },
  { description: 'doctor consultation', expected: 'healthcare' },
  
  // ==================== ENTERTAINMENT ====================
  // Thai - Movies & Events
  { description: 'Major Cineplex รัชโยธิน', expected: 'entertainment' },
  { description: 'SF Cinema หนัง', expected: 'entertainment' },
  { description: 'ตั๋วหนัง Avengers', expected: 'entertainment' },
  { description: 'คอนเสิร์ต BTS', expected: 'entertainment' },
  { description: 'บัตรคอนเสิร์ต', expected: 'entertainment' },
  
  // Thai - Games
  { description: 'Steam เกม', expected: 'entertainment' },
  { description: 'PlayStation Plus', expected: 'entertainment' },
  { description: 'Nintendo eShop', expected: 'entertainment' },
  { description: 'เติมเกม ROV', expected: 'entertainment' },
  { description: 'เติมเพชร Free Fire', expected: 'entertainment' },
  
  // Thai - Travel & Tourism
  { description: 'Agoda โรงแรม เชียงใหม่', expected: 'entertainment' },
  { description: 'Booking.com ที่พัก', expected: 'entertainment' },
  { description: 'Airbnb บ้านพัก', expected: 'entertainment' },
  { description: 'Traveloka จองโรงแรม', expected: 'entertainment' },
  { description: 'Klook ตั๋วท่องเที่ยว', expected: 'entertainment' },
  { description: 'KKday ทัวร์', expected: 'entertainment' },
  { description: 'สวนสนุก ดรีมเวิลด์', expected: 'entertainment' },
  { description: 'Safari World ค่าเข้า', expected: 'entertainment' },
  { description: 'ท่องเที่ยว ภูเก็ต', expected: 'entertainment' },
  
  // Thai - Leisure Activities
  { description: 'คาราโอเกะ', expected: 'entertainment' },
  { description: 'โบว์ลิ่ง', expected: 'entertainment' },
  { description: 'สนุกเกอร์', expected: 'entertainment' },
  
  // English - Entertainment
  { description: 'movie tickets', expected: 'entertainment' },
  { description: 'cinema popcorn', expected: 'entertainment' },
  { description: 'concert ticket', expected: 'entertainment' },
  { description: 'game purchase Steam', expected: 'entertainment' },
  { description: 'hotel booking', expected: 'entertainment' },
  { description: 'resort vacation', expected: 'entertainment' },
  { description: 'theme park', expected: 'entertainment' },
  { description: 'karaoke night', expected: 'entertainment' },
  
  // ==================== EDUCATION ====================
  // Thai - Tuition & Courses
  { description: 'ค่าเทอม มหาวิทยาลัย', expected: 'education' },
  { description: 'ค่าเรียน ภาษาอังกฤษ', expected: 'education' },
  { description: 'ค่าคอร์สเรียนภาษาอังกฤษ', expected: 'education' },
  { description: 'คอร์สออนไลน์ Udemy', expected: 'education' },
  { description: 'Coursera subscription', expected: 'education' },
  { description: 'Skillshare รายปี', expected: 'education' },
  { description: 'ติวเตอร์ คณิตศาสตร์', expected: 'education' },
  { description: 'กวดวิชา เคมี', expected: 'education' },
  { description: 'เรียนพิเศษ', expected: 'education' },
  
  // Thai - Books & Stationery
  { description: 'หนังสือ SE-ED', expected: 'education' },
  { description: 'ซีเอ็ด ตำราเรียน', expected: 'education' },
  { description: 'B2S เครื่องเขียน', expected: 'education' },
  { description: 'นายอินทร์ หนังสือ', expected: 'education' },
  { description: 'Asia Books', expected: 'education' },
  { description: 'Kinokuniya หนังสือ', expected: 'education' },
  { description: 'อุปกรณ์การเรียน', expected: 'education' },
  
  // Thai - Exams & Certifications
  { description: 'ค่าสอบ TOEIC', expected: 'education' },
  { description: 'ค่าสอบ IELTS', expected: 'education' },
  { description: 'สอบใบขับขี่', expected: 'education' },
  
  // English - Education
  { description: 'tuition fee', expected: 'education' },
  { description: 'online course', expected: 'education' },
  { description: 'textbook purchase', expected: 'education' },
  { description: 'stationery supplies', expected: 'education' },
  { description: 'exam registration', expected: 'education' },
  { description: 'certification training', expected: 'education' },
  { description: 'workshop seminar', expected: 'education' },
  { description: 'school supplies', expected: 'education' },
  
  // ==================== TRANSFER ====================
  // Thai - Transfers
  { description: 'โอนให้ แม่', expected: 'transfer' },
  { description: 'โอนเงินให้ พ่อ', expected: 'transfer' },
  { description: 'ส่งเงินให้ น้อง', expected: 'transfer' },
  { description: 'โอน พี่สาว', expected: 'transfer' },
  { description: 'โอนเงิน เพื่อน', expected: 'transfer' },
  { description: 'โอนค่าใช้จ่าย', expected: 'transfer' },
  
  // English - Transfers
  { description: 'transfer to mom', expected: 'transfer' },
  { description: 'send money dad', expected: 'transfer' },
  { description: 'money transfer friend', expected: 'transfer' },
  
  // SMS Banking Format - Transfer
  { description: 'TRF TO 0812345678', expected: 'transfer' },
  { description: 'TRANSFER TO SAVINGS', expected: 'transfer' },
  
  // ==================== INCOME ====================
  // Thai - Salary & Wages
  { description: 'เงินเดือน บริษัท ABC', expected: 'income' },
  { description: 'เงินเดือน ธ.ค.', expected: 'income' },
  { description: 'โบนัส ปลายปี', expected: 'income' },
  { description: 'ค่าจ้าง ฟรีแลนซ์', expected: 'income' },
  { description: 'รายได้ เสริม', expected: 'income' },
  { description: 'ค่าคอมมิชชั่น', expected: 'income' },
  
  // Thai - Refunds & Cashback
  { description: 'เงินคืน Shopee', expected: 'income' },
  { description: 'แคชแบ็ค บัตรเครดิต', expected: 'income' },
  { description: 'คืนเงิน ค่าสินค้า', expected: 'income' },
  { description: 'เงินโอนเข้า', expected: 'income' },
  { description: 'รับเงิน จากลูกค้า', expected: 'income' },
  
  // English - Income
  { description: 'salary December', expected: 'income' },
  { description: 'monthly wage', expected: 'income' },
  { description: 'bonus payment', expected: 'income' },
  { description: 'freelance income', expected: 'income' },
  { description: 'refund received', expected: 'income' },
  { description: 'cashback reward', expected: 'income' },
  { description: 'commission earned', expected: 'income' },
  { description: 'deposit received', expected: 'income' },
  
  // ==================== OTHER / EDGE CASES ====================
  // Ambiguous
  { description: 'ของขวัญ', expected: 'other' },
  { description: 'ค่าบริการ', expected: 'other' },
  { description: 'ค่าธรรมเนียม', expected: 'other' },
  { description: 'miscellaneous', expected: 'other' },
  { description: 'other expenses', expected: 'other' },
  
  // Generic SMS Banking
  { description: 'POS PURCHASE 150.00', expected: 'other' },
  { description: 'PAYMENT 500', expected: 'other' },
  { description: 'PURCHASE', expected: 'other' },
  { description: 'EDC TRANSACTION', expected: 'other' },
  
  // Empty & Whitespace
  { description: '', expected: 'other' },
  { description: '   ', expected: 'other' },
  { description: '\t\n', expected: 'other' },
  
  // Numbers only
  { description: '12345', expected: 'other' },
  { description: '500.00', expected: 'other' },
  
  // Unknown/Gibberish
  { description: 'asdfghjkl', expected: 'other' },
  { description: 'xxx', expected: 'other' },
  { description: 'test', expected: 'other' },
  
  // ==================== MIXED / TRICKY CASES ====================
  // Food payment (should be food, not transfer)
  { description: 'โอนเงิน ค่าข้าว ให้เพื่อน', expected: 'food' },
  { description: 'โอนค่าอาหาร', expected: 'food' },
  { description: 'จ่ายค่ากาแฟ', expected: 'food' },
  
  // Transport payment
  { description: 'โอนค่าน้ำมัน', expected: 'transport' },
  { description: 'จ่ายค่าแท็กซี่', expected: 'transport' },
  
  // Shopping at food store (context matters)
  { description: 'Watsons วิตามิน', expected: 'healthcare' },
  { description: 'Watsons สกินแคร์', expected: 'shopping' },
  
  // Long descriptions
  { description: 'ค่าอาหารกลางวัน ที่ร้าน MK สาขาเซ็นทรัลลาดพร้าว วันที่ 15 ธ.ค.', expected: 'food' },
  { description: 'เติมน้ำมัน ปตท. สาขาถนนวิภาวดี 95 แก๊สโซฮอล์ 40 ลิตร', expected: 'transport' },
  
  // With amounts (should ignore amounts)
  { description: 'Starbucks 185 บาท', expected: 'food' },
  { description: 'BTS 44 บาท', expected: 'transport' },
  { description: 'Netflix 419 บาท', expected: 'utilities' },
  
  // Mixed Thai-English (Tinglish)
  { description: 'กิน lunch กับเพื่อน', expected: 'food' },
  { description: 'ไป gym ออกกำลังกาย', expected: 'healthcare' },
  { description: 'ดู movie ที่ Major', expected: 'entertainment' },
  { description: 'ซื้อ book ที่ SE-ED', expected: 'education' },
];

// Group test cases by category for easier review
export const testCasesByCategory = testCases.reduce((acc, tc) => {
  if (!acc[tc.expected]) {
    acc[tc.expected] = [];
  }
  acc[tc.expected].push(tc);
  return acc;
}, {} as Record<Category, TestCase[]>);

// Summary of test cases
export const testCaseSummary = Object.entries(testCasesByCategory).map(([category, cases]) => ({
  category,
  count: cases.length,
}));
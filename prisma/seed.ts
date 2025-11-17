import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Define Iraqi governorates
  const governorates = ['Baghdad', 'Basra', 'Erbil', 'Mosul', 'Najaf'];

  // Create sample users (2 per governorate)
  const users = [];
  for (const gov of governorates) {
    const user1 = await prisma.user.create({
      data: {
        name: `User from ${gov}`,
        email: `user1.${gov.toLowerCase()}@hamlet.iq`,
        phone: `+964${Math.floor(Math.random() * 1000000000)}`,
        governorate: gov,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${gov}1`,
      },
    });

    const user2 = await prisma.user.create({
      data: {
        name: `${gov} Resident`,
        email: `user2.${gov.toLowerCase()}@hamlet.iq`,
        phone: `+964${Math.floor(Math.random() * 1000000000)}`,
        governorate: gov,
        university: gov === 'Baghdad' || gov === 'Erbil' ? `${gov} University` : undefined,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${gov}2`,
      },
    });

    users.push(user1, user2);
  }

  console.log(`Created ${users.length} users`);

  // Create 10 posts across governorates
  const postContents = [
    'مرحبا بكم في هاملت! منصة جديدة للتواصل الاجتماعي في العراق 🇮🇶',
    'Beautiful sunset in the city today! 🌅',
    'بێنن بەشداری بوونی خۆمان لە پێشنیارەکان',
    'Looking forward to the upcoming cultural festival!',
    'أفضل مطعم في المدينة! يجب أن تجربوه',
    'Great coffee shop opened near my neighborhood ☕',
    'تەواوبوونی پرۆژەیەکی نوێی گەشتیاری',
    'Weekend plans: exploring the local market 🛍️',
    'جمعة مباركة للجميع! 🕌',
    'New art exhibition opening next week. Don\'t miss it!',
  ];

  const posts = [];
  for (let i = 0; i < 10; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const post = await prisma.post.create({
      data: {
        content: postContents[i],
        governorate: randomUser.governorate,
        userId: randomUser.id,
        image: i % 3 === 0 ? `https://picsum.photos/seed/${i}/800/600` : undefined,
      },
    });
    posts.push(post);
  }

  console.log(`Created ${posts.length} posts`);

  // Create 20 places across categories
  const categories = ['Dining', 'Entertainment', 'Shopping', 'Services', 'Culture'];
  const placeNames = [
    { en: 'Al-Rasheed Restaurant', ar: 'مطعم الرشيد', ku: 'چێشتخانەی ڕەشید' },
    { en: 'Tigris Café', ar: 'مقهى دجلة', ku: 'کافێی دجلە' },
    { en: 'Baghdad Mall', ar: 'مول بغداد', ku: 'پاساژی بەغدا' },
    { en: 'Babylon Cinema', ar: 'سينما بابل', ku: 'سینەمای بابل' },
    { en: 'Zawraa Park', ar: 'منتزه الزوراء', ku: 'پارکی زەورا' },
    { en: 'National Museum', ar: 'المتحف الوطني', ku: 'مۆزەخانەی نیشتمانی' },
    { en: 'Basra Seafood House', ar: 'بيت المأكولات البحرية البصرة', ku: 'ماڵی خواردنی دەریایی بەسرە' },
    { en: 'Erbil Citadel Café', ar: 'مقهى قلعة أربيل', ku: 'کافێی قەڵای هەولێر' },
    { en: 'Mosul Heritage Gallery', ar: 'معرض تراث الموصل', ku: 'گالێری میراتی مووسڵ' },
    { en: 'Najaf Library', ar: 'مكتبة النجف', ku: 'کتێبخانەی نەجەف' },
    { en: 'Tech Hub Baghdad', ar: 'مركز التقنية بغداد', ku: 'سەنتەری تەکنەلۆژیای بەغدا' },
    { en: 'Fitness Zone', ar: 'منطقة اللياقة', ku: 'ناوچەی لەشجوانی' },
    { en: 'Green Gardens Restaurant', ar: 'مطعم الحدائق الخضراء', ku: 'چێشتخانەی باخچە سەوزەکان' },
    { en: 'Night Owl Lounge', ar: 'صالة البومة الليلية', ku: 'لاونجی کوندەپەڕی شەو' },
    { en: 'Souk al-Arabi', ar: 'السوق العربي', ku: 'بازاڕی عەرەبی' },
    { en: 'Grand Hotel Restaurant', ar: 'مطعم الفندق الكبير', ku: 'چێشتخانەی ھوتێلی گەورە' },
    { en: 'Family Fun Center', ar: 'مركز المرح العائلي', ku: 'سەنتەری خۆشی خێزانی' },
    { en: 'Book Haven', ar: 'ملاذ الكتب', ku: 'پەناگەی کتێب' },
    { en: 'Traditional Crafts Shop', ar: 'متجر الحرف التقليدية', ku: 'دوکانی پیشەسازی نەریتی' },
    { en: 'Cultural Center', ar: 'المركز الثقافي', ku: 'سەنتەری کولتووری' },
  ];

  const places = [];
  for (let i = 0; i < 20; i++) {
    const gov = governorates[i % governorates.length];
    const category = categories[i % categories.length];
    const place = await prisma.place.create({
      data: {
        name: placeNames[i].en,
        name_ar: placeNames[i].ar,
        name_ku: placeNames[i].ku,
        category,
        governorate: gov,
        address: `${i + 1} Main Street, ${gov}`,
        description: `A wonderful ${category.toLowerCase()} destination in ${gov}`,
        description_ar: `وجهة ${category} رائعة في ${gov}`,
        description_ku: `شوێنێکی ${category} نایاب لە ${gov}`,
        images: JSON.stringify([`https://picsum.photos/seed/place${i}/800/600`]),
        phone: `+964 ${Math.floor(Math.random() * 1000)} ${Math.floor(Math.random() * 10000)}`,
        latitude: 33.3 + Math.random() * 3,
        longitude: 43.1 + Math.random() * 3,
      },
    });
    places.push(place);
  }

  console.log(`Created ${places.length} places`);

  // Create 5 events
  const eventData = [
    {
      title: 'Baghdad International Book Fair',
      title_ar: 'معرض بغداد الدولي للكتاب',
      title_ku: 'پێشانگای نێودەوڵەتی کتێبی بەغدا',
      category: 'Culture',
      gov: 'Baghdad',
      description: 'Annual book fair featuring local and international publishers',
    },
    {
      title: 'Basra Food Festival',
      title_ar: 'مهرجان الطعام البصري',
      title_ku: 'فێستیڤاڵی خواردنی بەسرە',
      category: 'Food',
      gov: 'Basra',
      description: 'Celebrating the diverse culinary heritage of Iraq',
    },
    {
      title: 'Erbil Music Night',
      title_ar: 'ليلة الموسيقى في أربيل',
      title_ku: 'شەوی مۆسیقای هەولێر',
      category: 'Entertainment',
      gov: 'Erbil',
      description: 'Live performances by local and regional artists',
    },
    {
      title: 'Mosul Heritage Walk',
      title_ar: 'مسيرة تراث الموصل',
      title_ku: 'ڕێپێوانی میراتی مووسڵ',
      category: 'Culture',
      gov: 'Mosul',
      description: 'Guided tour of historical sites and monuments',
    },
    {
      title: 'Najaf Spiritual Gathering',
      title_ar: 'اللقاء الروحي في النجف',
      title_ku: 'کۆبوونەوەی ڕۆحانی لە نەجەف',
      category: 'Spiritual',
      gov: 'Najaf',
      description: 'Community gathering for reflection and dialogue',
    },
  ];

  const events = [];
  for (let i = 0; i < 5; i++) {
    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() + (i + 1) * 7); // Events 1, 2, 3, 4, 5 weeks from now

    const event = await prisma.event.create({
      data: {
        title: eventData[i].title,
        title_ar: eventData[i].title_ar,
        title_ku: eventData[i].title_ku,
        description: eventData[i].description,
        description_ar: `${eventData[i].description} - وصف بالعربية`,
        description_ku: `${eventData[i].description} - وەسفی کوردی`,
        governorate: eventData[i].gov,
        category: eventData[i].category,
        date: eventDate,
        location: `${eventData[i].gov} Convention Center`,
        address: `Main Avenue, ${eventData[i].gov}`,
        image: `https://picsum.photos/seed/event${i}/1200/600`,
        organizer: `${eventData[i].gov} Cultural Committee`,
      },
    });
    events.push(event);
  }

  console.log(`Created ${events.length} events`);

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

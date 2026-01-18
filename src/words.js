// Biblical words suitable for a 30-second game (200 words)
// Each word is an object with English and Dutch translations
export const biblicalWords = [
  // People (25)
  { en: 'Adam', nl: 'Adam' }, { en: 'Eve', nl: 'Eva' }, { en: 'Noah', nl: 'Noach' }, { en: 'Abraham', nl: 'Abraham' },
  { en: 'Sarah', nl: 'Sara' }, { en: 'Isaac', nl: 'Isaak' }, { en: 'Jacob', nl: 'Jakob' }, { en: 'Joseph', nl: 'Jozef' },
  { en: 'Moses', nl: 'Mozes' }, { en: 'Aaron', nl: 'Aäron' }, { en: 'Joshua', nl: 'Jozua' }, { en: 'Ruth', nl: 'Ruth' },
  { en: 'David', nl: 'David' }, { en: 'Goliath', nl: 'Goliath' }, { en: 'Solomon', nl: 'Salomo' }, { en: 'Esther', nl: 'Esther' },
  { en: 'Daniel', nl: 'Daniël' }, { en: 'Jonah', nl: 'Jona' }, { en: 'Mary', nl: 'Maria' }, { en: 'Jesus', nl: 'Jezus' },
  { en: 'John', nl: 'Johannes' }, { en: 'Peter', nl: 'Petrus' }, { en: 'Paul', nl: 'Paulus' }, { en: 'Timothy', nl: 'Timoteüs' }, { en: 'Stephen', nl: 'Stefanus' },
  
  // More People (25)
  { en: 'Cain', nl: 'Kaïn' }, { en: 'Abel', nl: 'Abel' }, { en: 'Lot', nl: 'Lot' }, { en: 'Rebekah', nl: 'Rebekka' },
  { en: 'Esau', nl: 'Ezau' }, { en: 'Benjamin', nl: 'Benjamin' }, { en: 'Samuel', nl: 'Samuel' }, { en: 'Saul', nl: 'Saul' },
  { en: 'Jonathan', nl: 'Jonathan' }, { en: 'Bathsheba', nl: 'Batseba' }, { en: 'Nathan', nl: 'Nathan' }, { en: 'Elijah', nl: 'Elia' },
  { en: 'Elisha', nl: 'Elisa' }, { en: 'Isaiah', nl: 'Jesaja' }, { en: 'Jeremiah', nl: 'Jeremia' },
  { en: 'Ezekiel', nl: 'Ezechiël' }, { en: 'Zechariah', nl: 'Zacharia' }, { en: 'Elizabeth', nl: 'Elisabet' }, { en: 'Zacharias', nl: 'Zacharias' },
  { en: 'Anna', nl: 'Anna' }, { en: 'Simeon', nl: 'Simeon' }, { en: 'Judas', nl: 'Judas' },
  { en: 'Thomas', nl: 'Thomas' }, { en: 'James', nl: 'Jakobus' }, { en: 'Andrew', nl: 'Andreas' },
  
  // Places (12)
  { en: 'Jerusalem', nl: 'Jeruzalem' }, { en: 'Bethlehem', nl: 'Bethlehem' }, { en: 'Nazareth', nl: 'Nazaret' }, { en: 'Canaan', nl: 'Kanaän' },
  { en: 'Egypt', nl: 'Egypte' }, { en: 'Babylon', nl: 'Babylon' }, { en: 'Nineveh', nl: 'Ninevé' }, { en: 'Jericho', nl: 'Jericho' },
  { en: 'Galilee', nl: 'Galilea' }, { en: 'Jordan', nl: 'Jordaan' }, { en: 'Gethsemane', nl: 'Getsemane' }, { en: 'Golgotha', nl: 'Golgotha' },
  
  // More Places (12)
  { en: 'Sodom', nl: 'Sodom' }, { en: 'Gomorrah', nl: 'Gomorra' }, { en: 'Mount Sinai', nl: 'Sinaïberg' }, { en: 'Mount Ararat', nl: 'Ararat' },
  { en: 'Red Sea', nl: 'Rode Zee' }, { en: 'Dead Sea', nl: 'Dode Zee' },
  { en: 'Sea of Galilee', nl: 'Meer van Galilea' }, { en: 'Samaria', nl: 'Samaria' }, { en: 'Corinth', nl: 'Korinthe' }, { en: 'Ephesus', nl: 'Efeze' },
  { en: 'Rome', nl: 'Rome' }, { en: 'Damascus', nl: 'Damas' },
  
  // Concepts & Themes (25)
  { en: 'Covenant', nl: 'Verbond' }, { en: 'Grace', nl: 'Genade' }, { en: 'Faith', nl: 'Geloof' }, { en: 'Hope', nl: 'Hoop' },
  { en: 'Love', nl: 'Liefde' }, { en: 'Mercy', nl: 'Barmhartigheid' }, { en: 'Forgiveness', nl: 'Vergeving' }, { en: 'Salvation', nl: 'Verlossing' },
  { en: 'Redemption', nl: 'Verlossing' }, { en: 'Resurrection', nl: 'Opstanding' }, { en: 'Paradise', nl: 'Paradijs' }, { en: 'Heaven', nl: 'Hemel' },
  { en: 'Angels', nl: 'Engelen' }, { en: 'Prophecy', nl: 'Profetie' }, { en: 'Revelation', nl: 'Openbaring' },
  { en: 'Gospel', nl: 'Evangelie' }, { en: 'Parable', nl: 'Gelijkenis' }, { en: 'Miracle', nl: 'Wonder' }, { en: 'Baptism', nl: 'Doop' },
  { en: 'Prayer', nl: 'Gebed' }, { en: 'Worship', nl: 'Aanbidding' }, { en: 'Praise', nl: 'Lofprijzing' }, { en: 'Testimony', nl: 'Getuigenis' },
  { en: 'Disciple', nl: 'Discipel' }, { en: 'Apostle', nl: 'Apostel' },
  
  // More Concepts & Themes (17)
  { en: 'Righteousness', nl: 'Rechtvaardigheid' }, { en: 'Holiness', nl: 'Heiligheid' }, { en: 'Repentance', nl: 'Bekering' }, { en: 'Confession', nl: 'Belijdenis' },
  { en: 'Fellowship', nl: 'Gemeenschap' }, { en: 'Anointing', nl: 'Zalving' }, { en: 'Blessing', nl: 'Zegen' }, { en: 'Sin', nl: 'Zonde' },
  { en: 'Temptation', nl: 'Verzoeking' }, { en: 'Suffering', nl: 'Lijden' }, { en: 'Persecution', nl: 'Vervolging' },
  { en: 'Eternal Life', nl: 'Eeuwig Leven' }, { en: 'Judgment', nl: 'Oordeel' }, { en: 'Second Coming', nl: 'Wederkomst' },
  { en: 'Rapture', nl: 'Opname' }, { en: 'Sanctification', nl: 'Heiliging' }, { en: 'Justification', nl: 'Rechtvaardiging' },
  
  // Objects & Symbols (12)
  { en: 'Ark', nl: 'Ark' }, { en: 'Cross', nl: 'Kruis' }, { en: 'Crown', nl: 'Kroon' }, { en: 'Sword', nl: 'Zwaard' },
  { en: 'Shield', nl: 'Schild' }, { en: 'Lamb', nl: 'Lam' }, { en: 'Dove', nl: 'Duif' }, { en: 'Bread', nl: 'Brood' },
  { en: 'Wine', nl: 'Wijn' }, { en: 'Water', nl: 'Water' }, { en: 'Fire', nl: 'Vuur' }, { en: 'Temple', nl: 'Tempel' },
  
  // More Objects & Symbols (12)
  { en: 'Altar', nl: 'Altaar' }, { en: 'Trumpet', nl: 'Bazuin' }, { en: 'Harp', nl: 'Harp' }, { en: 'Incense', nl: 'Wierook' },
  { en: 'Oil', nl: 'Olie' }, { en: 'Salt', nl: 'Zout' }, { en: 'Honey', nl: 'Honing' },
  { en: 'Manna', nl: 'Manna' }, { en: 'Fish', nl: 'Vis' }, { en: 'Pearl', nl: 'Parel' }, { en: 'Stone', nl: 'Steen' }, { en: 'Gold', nl: 'Goud' },
  
  // Events & Stories (10)
  { en: 'Creation', nl: 'Schepping' }, { en: 'Flood', nl: 'Zondvloed' }, { en: 'Exodus', nl: 'Exodus' }, { en: 'Crucifixion', nl: 'Kruisiging' },
  { en: 'Ascension', nl: 'Hemelvaart' }, { en: 'Pentecost', nl: 'Pinksteren' },
  { en: 'Last Supper', nl: 'Laatste Avondmaal' }, { en: 'Garden of Eden', nl: 'Hof van Eden' }, { en: 'Tower of Babel', nl: 'Toren van Babel' },
  { en: 'Parting of Red Sea', nl: 'Splijting van de Rode Zee' },
  
  // More Events & Stories (14)
  { en: 'Fall of Man', nl: 'Val van de Mens' }, { en: 'Cain and Abel', nl: 'Kaïn en Abel' }, { en: 'Sodom and Gomorrah', nl: 'Sodom en Gomorra' },
  { en: 'Binding of Isaac', nl: 'Offering van Isaak' }, { en: 'Burning Bush', nl: 'Brandende Braamstruik' }, { en: 'Ten Plagues', nl: 'Tien Plagen' },
  { en: 'Walls of Jericho', nl: 'Muren van Jericho' }, { en: 'David and Goliath', nl: 'David en Goliath' },
  { en: 'Daniel in Lions\' Den', nl: 'Daniël in de Leeuwenkuil' }, { en: 'Jonah and the Whale', nl: 'Jona en de Walvis' },
  { en: 'Nativity', nl: 'Geboorte' }, { en: 'Transfiguration', nl: 'Verheerlijking' },
  { en: 'Triumphal Entry', nl: 'Intocht in Jeruzalem' }, { en: 'Road to Emmaus', nl: 'Weg naar Emmaüs' },
  
  // Books & Writings (6)
  { en: 'Genesis', nl: 'Genesis' }, { en: 'Psalms', nl: 'Psalmen' }, { en: 'Proverbs', nl: 'Spreuken' },
  { en: 'Revelation', nl: 'Openbaring' }, { en: 'Gospel', nl: 'Evangelie' }, { en: 'Epistle', nl: 'Brief' },
  
  // More Books & Writings (8)
  { en: 'Exodus', nl: 'Exodus' }, { en: 'Leviticus', nl: 'Leviticus' }, { en: 'Numbers', nl: 'Numeri' },
  { en: 'Deuteronomy', nl: 'Deuteronomium' }, { en: 'Joshua', nl: 'Jozua' }, { en: 'Judges', nl: 'Rechters' },
  { en: 'Job', nl: 'Job' }, { en: 'Ecclesiastes', nl: 'Prediker' },
  
  // Additional terms (10)
  { en: 'Messiah', nl: 'Messias' }, { en: 'Savior', nl: 'Verlosser' }, { en: 'Lord', nl: 'Heer' }, { en: 'Christ', nl: 'Christus' },
  { en: 'Trinity', nl: 'Drie-eenheid' }, { en: 'Holy Spirit', nl: 'Heilige Geest' }, { en: 'Commandment', nl: 'Gebod' },
  { en: 'Ten Commandments', nl: 'Tien Geboden' }, { en: 'Sermon on the Mount', nl: 'Bergrede' }, { en: 'Beatitudes', nl: 'Zaligsprekingen' },
  
  // More Additional terms (12)
  { en: 'Alpha and Omega', nl: 'Alfa en Omega' }, { en: 'Lamb of God', nl: 'Lam van God' }, { en: 'Good Shepherd', nl: 'Goede Herder' },
  { en: 'Light of the World', nl: 'Licht der Wereld' }, { en: 'Bread of Life', nl: 'Brood des Levens' }, { en: 'Son of God', nl: 'Zoon van God' },
  { en: 'Son of Man', nl: 'Zoon des Mensen' }, { en: 'Prince of Peace', nl: 'Vredevorst' },
  { en: 'New Covenant', nl: 'Nieuw Verbond' }, { en: 'Scripture', nl: 'Schrift' }, { en: 'Old Testament', nl: 'Oude Testament' },
  { en: 'New Testament', nl: 'Nieuwe Testament' }
];

// Helper function to get words in selected language
export const getWordsInLanguage = (words, language = 'en') => {
  return words.map(word => typeof word === 'string' ? word : word[language])
}

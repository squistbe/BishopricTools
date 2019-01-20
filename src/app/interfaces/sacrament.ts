import { Member } from './member';

export interface Hymn {
    name: string;
    number: string;
}

export interface MeetingOptions {
    isTestimonyMeeting?: boolean;
    isGeneralConference?: boolean;
    isStakeConference?: boolean;
    isTempleDedication?: boolean;
}

export interface Sacrament {
    date: string;
    dateTag: string;
    id?: string;
    topic?: string;
    invocation?: Member;
    benediction?: Member;
    openingHymn?: Hymn;
    sacramentalHymn?: Hymn;
    closingHymn?: Hymn;
    speakers?: Member[];
    unitNumber: number;
    meetingOptions: MeetingOptions;
    conducting?: Member;
}

export class SacramentSettings {
    public static SACRAMENT_MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    public static HYMNS = [
        {
          number: '1',
          name: 'The Morning Breaks'
        },
        {
          number: '2',
          name: 'The Spirit of God'
        },
        {
          number: '3',
          name: 'Now Let Us Rejoice'
        },
        {
          number: '4',
          name: 'Truth Eternal'
        },
        {
          number: '5',
          name: 'High on the Mountain Top'
        },
        {
          number: '6',
          name: 'Redeemer of Israel'
        },
        {
          number: '7',
          name: 'Israel, Israel, God Is Calling'
        },
        {
          number: '8',
          name: 'Awake and Arise'
        },
        {
          number: '9',
          name: 'Come, Rejoice'
        },
        {
          number: '10',
          name: 'Come, Sing to the Lord'
        },
        {
          number: '11',
          name: 'What Was Witnessed in the Heavens?'
        },
        {
          number: '12',
          name: '\'Twas Witnessed in the Morning Sky'
        },
        {
          number: '13',
          name: 'An Angel from on High'
        },
        {
          number: '14',
          name: 'Sweet Is the Peace the Gospel Brings'
        },
        {
          number: '15',
          name: 'I Saw a Mighty Angel Fly'
        },
        {
          number: '16',
          name: 'What Glorious Scenes Mine Eyes Behold'
        },
        {
          number: '17',
          name: 'Awake, Ye Saints of God, Awake!'
        },
        {
          number: '18',
          name: 'The Voice of God Again Is Heard'
        },
        {
          number: '19',
          name: 'We Thank Thee, O God, for a Prophet'
        },
        {
          number: '20',
          name: 'God of Power, God of Right'
        },
        {
          number: '21',
          name: 'Come, Listen to a Prophet\'s Voice'
        },
        {
          number: '22',
          name: 'We Listen to a Prophet\'s Voice'
        },
        {
          number: '23',
          name: 'We Ever Pray for Thee'
        },
        {
          number: '24',
          name: 'God Bless Our Prophet Dear'
        },
        {
          number: '25',
          name: 'Now We\'ll Sing with One Accord'
        },
        {
          number: '26',
          name: 'Joseph Smith\'s First Prayer'
        },
        {
          number: '27',
          name: 'Praise to the Man'
        },
        {
          number: '28',
          name: 'Saints, Behold How Great Jehovah'
        },
        {
          number: '29',
          name: 'A Poor Wayfaring Man of Grief'
        },
        {
          number: '30',
          name: 'Come, Come, Ye Saints'
        },
        {
          number: '31',
          name: 'O God, Our Help in Ages Past'
        },
        {
          number: '32',
          name: 'The Happy Day at Last Has Come'
        },
        {
          number: '33',
          name: 'Our Mountain Home So Dear'
        },
        {
          number: '34',
          name: 'O Ye Mountains High'
        },
        {
          number: '35',
          name: 'For the Strength of the Hills'
        },
        {
          number: '36',
          name: 'They, the Builders of the Nation'
        },
        {
          number: '37',
          name: 'The Wintry Day, Descending to Its Close'
        },
        {
          number: '38',
          name: 'Come, All Ye Saints of Zion'
        },
        {
          number: '39',
          name: 'O Saints of Zion'
        },
        {
          number: '40',
          name: 'Arise, O Glorious Zion'
        },
        {
          number: '41',
          name: 'Let Zion in Her Beauty Rise'
        },
        {
          number: '42',
          name: 'Hail to the Brightness of Zion\'s Glad Morning!'
        },
        {
          number: '43',
          name: 'Zion Stands with Hills Surrounded'
        },
        {
          number: '44',
          name: 'Beautiful Zion, Built Above'
        },
        {
          number: '45',
          name: 'Lead Me into Life Eternal'
        },
        {
          number: '46',
          name: 'Glorious Things of Thee Are Spoken'
        },
        {
          number: '47',
          name: 'We Will Sing of Zion'
        },
        {
          number: '48',
          name: 'Glorious Things Are Sung of Zion'
        },
        {
          number: '49',
          name: 'Adam-ondi-Ahman'
        },
        {
          number: '50',
          name: 'Come, Thou Glorious Day of Promise'
        },
        {
          number: '51',
          name: 'Sons of Michael, He Approaches'
        },
        {
          number: '52',
          name: 'The Day Dawn Is Breaking'
        },
        {
          number: '53',
          name: 'Let Earth\'s Inhabitants Rejoice'
        },
        {
          number: '54',
          name: 'Behold, the Mountain of the Lord'
        },
        {
          number: '55',
          name: 'Lo, the Mighty God Appearing!'
        },
        {
          number: '56',
          name: 'Softly Beams the Sacred Dawning'
        },
        {
          number: '57',
          name: 'We\'re Not Ashamed to Own Our Lord'
        },
        {
          number: '58',
          name: 'Come, Ye Children of the Lord'
        },
        {
          number: '59',
          name: 'Come, O Thou King of Kings'
        },
        {
          number: '60',
          name: 'Battle Hymn of the Republic'
        },
        {
          number: '61',
          name: 'Raise Your Voices to the Lord'
        },
        {
          number: '62',
          name: 'All Creatures of Our God and King'
        },
        {
          number: '63',
          name: 'Great King of Heaven'
        },
        {
          number: '64',
          name: 'On This Day of Joy and Gladness'
        },
        {
          number: '65',
          name: 'Come, All Ye Saints Who Dwell on Earth'
        },
        {
          number: '66',
          name: 'Rejoice, the Lord Is King!'
        },
        {
          number: '67',
          name: 'Glory to God on High'
        },
        {
          number: '68',
          name: 'A Mighty Fortress Is Our God'
        },
        {
          number: '69',
          name: 'All Glory, Laud, and Honor'
        },
        {
          number: '70',
          name: 'Sing Praise to Him'
        },
        {
          number: '71',
          name: 'With Songs of Praise'
        },
        {
          number: '72',
          name: 'Praise to the Lord, the Almighty'
        },
        {
          number: '73',
          name: 'Praise the Lord with Heart and Voice'
        },
        {
          number: '74',
          name: 'Praise Ye the Lord'
        },
        {
          number: '75',
          name: 'In Hymns of Praise'
        },
        {
          number: '76',
          name: 'God of Our Fathers, We Come unto Thee'
        },
        {
          number: '77',
          name: 'Great Is the Lord'
        },
        {
          number: '78',
          name: 'God of Our Fathers, Whose Almighty Hand'
        },
        {
          number: '79',
          name: 'With All the Power of Heart and Tongue'
        },
        {
          number: '80',
          name: 'God of Our Fathers, Known of Old'
        },
        {
          number: '81',
          name: 'Press Forward, Saints'
        },
        {
          number: '82',
          name: 'For All the Saints'
        },
        {
          number: '83',
          name: 'Guide Us, O Thou Great Jehovah'
        },
        {
          number: '84',
          name: 'Faith of Our Fathers'
        },
        {
          number: '85',
          name: 'How Firm a Foundation'
        },
        {
          number: '86',
          name: 'How Great Thou Art'
        },
        {
          number: '87',
          name: 'God Is Love'
        },
        {
          number: '88',
          name: 'Great God, Attend While Zion Sings'
        },
        {
          number: '89',
          name: 'The Lord Is My Light'
        },
        {
          number: '90',
          name: 'From All That Dwell below the Skies'
        },
        {
          number: '91',
          name: 'Father, Thy Children to Thee Now Raise'
        },
        {
          number: '92',
          name: 'For the Beauty of the Earth'
        },
        {
          number: '93',
          name: 'Prayer of Thanksgiving'
        },
        {
          number: '94',
          name: 'Come, Ye Thankful People'
        },
        {
          number: '95',
          name: 'Now Thank We All Our God'
        },
        {
          number: '96',
          name: 'Dearest Children, God Is Near You'
        },
        {
          number: '97',
          name: 'Lead, Kindly Light'
        },
        {
          number: '98',
          name: 'I Need Thee Every Hour'
        },
        {
          number: '99',
          name: 'Nearer, Dear Savior, to Thee'
        },
        {
          number: '100',
          name: 'Nearer, My God, to Thee'
        },
        {
          number: '101',
          name: 'Guide Me to Thee'
        },
        {
          number: '102',
          name: 'Jesus, Lover of My Soul'
        },
        {
          number: '103',
          name: 'Precious Savior, Dear Redeemer'
        },
        {
          number: '104',
          name: 'Jesus, Savior, Pilot Me'
        },
        {
          number: '105',
          name: 'Master, the Tempest Is Raging'
        },
        {
          number: '106',
          name: 'God Speed the Right'
        },
        {
          number: '107',
          name: 'Lord, Accept Our True Devotion'
        },
        {
          number: '108',
          name: 'The Lord Is My Shepherd'
        },
        {
          number: '109',
          name: 'The Lord My Pasture Will Prepare'
        },
        {
          number: '110',
          name: 'Cast Thy Burden upon the Lord'
        },
        {
          number: '111',
          name: 'Rock of Ages'
        },
        {
          number: '112',
          name: 'Savior, Redeemer of My Soul'
        },
        {
          number: '113',
          name: 'Our Savior\'s Love'
        },
        {
          number: '114',
          name: 'Come unto Him'
        },
        {
          number: '115',
          name: 'Come, Ye Disconsolate'
        },
        {
          number: '116',
          name: 'Come, Follow Me'
        },
        {
          number: '117',
          name: 'Come unto Jesus'
        },
        {
          number: '118',
          name: 'Ye Simple Souls Who Stray'
        },
        {
          number: '119',
          name: 'Come, We That Love the Lord'
        },
        {
          number: '120',
          name: 'Lean on My Ample Arm'
        },
        {
          number: '121',
          name: 'I\'m a Pilgrim, I\'m a Stranger'
        },
        {
          number: '122',
          name: 'Though Deepening Trials'
        },
        {
          number: '123',
          name: 'Oh, May My Soul Commune with Thee'
        },
        {
          number: '124',
          name: 'Be Still, My Soul'
        },
        {
          number: '125',
          name: 'How Gentle God\'s Commands'
        },
        {
          number: '126',
          name: 'How Long, O Lord Most Holy and True'
        },
        {
          number: '127',
          name: 'Does the Journey Seem Long?'
        },
        {
          number: '128',
          name: 'When Faith Endures'
        },
        {
          number: '129',
          name: 'Where Can I Turn for Peace?'
        },
        {
          number: '130',
          name: 'Be Thou Humble'
        },
        {
          number: '131',
          name: 'More Holiness Give Me'
        },
        {
          number: '132',
          name: 'God Is in His Holy Temple'
        },
        {
          number: '133',
          name: 'Father in Heaven'
        },
        {
          number: '134',
          name: 'I Believe in Christ'
        },
        {
          number: '135',
          name: 'My Redeemer Lives'
        },
        {
          number: '136',
          name: 'I Know That My Redeemer Lives'
        },
        {
          number: '137',
          name: 'Testimony'
        },
        {
          number: '138',
          name: 'Bless Our Fast, We Pray'
        },
        {
          number: '139',
          name: 'In Fasting We Approach Thee'
        },
        {
          number: '140',
          name: 'Did You Think to Pray?'
        },
        {
          number: '141',
          name: 'Jesus, the Very Thought of Thee'
        },
        {
          number: '142',
          name: 'Sweet Hour of Prayer'
        },
        {
          number: '143',
          name: 'Let the Holy Spirit Guide'
        },
        {
          number: '144',
          name: 'Secret Prayer'
        },
        {
          number: '145',
          name: 'Prayer Is the Soul\'s Sincere Desire'
        },
        {
          number: '146',
          name: 'Gently Raise the Sacred Strain'
        },
        {
          number: '147',
          name: 'Sweet Is the Work'
        },
        {
          number: '148',
          name: 'Sabbath Day'
        },
        {
          number: '149',
          name: 'As the Dew from Heaven Distilling'
        },
        {
          number: '150',
          name: 'O Thou Kind and Gracious Father'
        },
        {
          number: '151',
          name: 'We Meet, Dear Lord'
        },
        {
          number: '152',
          name: 'God Be with You Till We Meet Again'
        },
        {
          number: '153',
          name: 'Lord, We Ask Thee Ere We Part'
        },
        {
          number: '154',
          name: 'Father, This Hour Has Been One of Joy'
        },
        {
          number: '155',
          name: 'We Have Partaken of Thy Love'
        },
        {
          number: '156',
          name: 'Sing We Now at Parting'
        },
        {
          number: '157',
          name: 'Thy Spirit, Lord, Has Stirred Our Souls'
        },
        {
          number: '158',
          name: 'Before Thee, Lord, I Bow My Head'
        },
        {
          number: '159',
          name: 'Now the Day Is Over'
        },
        {
          number: '160',
          name: 'Softly Now the Light of Day'
        },
        {
          number: '161',
          name: 'The Lord Be with Us'
        },
        {
          number: '162',
          name: 'Lord, We Come before Thee Now'
        },
        {
          number: '163',
          name: 'Lord, Dismiss Us with Thy Blessing'
        },
        {
          number: '164',
          name: 'Great God, to Thee My Evening Song'
        },
        {
          number: '165',
          name: 'Abide with Me; \'Tis Eventide'
        },
        {
          number: '166',
          name: 'Abide with Me!'
        },
        {
          number: '167',
          name: 'Come, Let Us Sing an Evening Hymn'
        },
        {
          number: '168',
          name: 'As the Shadows Fall'
        },
        {
          number: '169',
          name: 'As Now We Take the Sacrament'
        },
        {
          number: '170',
          name: 'God, Our Father, Hear Us Pray'
        },
        {
          number: '171',
          name: 'With Humble Heart'
        },
        {
          number: '172',
          name: 'In Humility, Our Savior'
        },
        {
          number: '173',
          name: 'While of These Emblems We Partake'
        },
        {
          number: '174',
          name: 'While of These Emblems We Partake'
        },
        {
          number: '175',
          name: 'O God, the Eternal Father'
        },
        {
          number: '176',
          name: '\'Tis Sweet to Sing the Matchless Love'
        },
        {
          number: '177',
          name: '\'Tis Sweet To Sing the Matchless Love'
        },
        {
          number: '178',
          name: 'O Lord of Hosts'
        },
        {
          number: '179',
          name: 'Again, Our Dear Redeeming Lord'
        },
        {
          number: '180',
          name: 'Father in Heaven, We Do Believe'
        },
        {
          number: '181',
          name: 'Jesus of Nazareth, Savior and King'
        },
        {
          number: '182',
          name: 'We\'ll Sing All Hail to Jesus\' Name'
        },
        {
          number: '183',
          name: 'In Remembrance of Thy Suffering'
        },
        {
          number: '184',
          name: 'Upon the Cross of Calvary'
        },
        {
          number: '185',
          name: 'Reverently and Meekly Now'
        },
        {
          number: '186',
          name: 'Again We Meet around the Board'
        },
        {
          number: '187',
          name: 'God Loved Us, So He Sent His Son'
        },
        {
          number: '188',
          name: 'Thy Will, O Lord, Be Done'
        },
        {
          number: '189',
          name: 'O Thou, Before the World Began'
        },
        {
          number: '190',
          name: 'In Memory of the Crucified'
        },
        {
          number: '191',
          name: 'Behold the Great Redeemer Die'
        },
        {
          number: '192',
          name: 'He Died! The Great Redeemer Died'
        },
        {
          number: '193',
          name: 'I Stand All Amazed'
        },
        {
          number: '194',
          name: 'There Is a Green Hill Far Away'
        },
        {
          number: '195',
          name: 'How Great the Wisdom and the Love'
        },
        {
          number: '196',
          name: 'Jesus, Once of Humble Birth'
        },
        {
          number: '197',
          name: 'O Savior, Thou Who Wearest a Crown'
        },
        {
          number: '198',
          name: 'That Easter Morn'
        },
        {
          number: '199',
          name: 'He Is Risen!'
        },
        {
          number: '200',
          name: 'Christ the Lord Is Risen Today'
        },
        {
          number: '201',
          name: 'Joy to the World'
        },
        {
          number: '202',
          name: 'Oh, Come, All Ye Faithful'
        },
        {
          number: '203',
          name: 'Angels We Have Heard on High'
        },
        {
          number: '204',
          name: 'Silent Night'
        },
        {
          number: '205',
          name: 'Once in Royal David\'s City'
        },
        {
          number: '206',
          name: 'Away in a Manger'
        },
        {
          number: '207',
          name: 'It Came upon the Midnight Clear'
        },
        {
          number: '208',
          name: 'O Little Town of Bethlehem'
        },
        {
          number: '209',
          name: 'Hark! The Herald Angels Sing'
        },
        {
          number: '210',
          name: 'With Wondering Awe'
        },
        {
          number: '211',
          name: 'While Shepherds Watched Their Flocks'
        },
        {
          number: '212',
          name: 'Far, Far Away on Judea\'s Plains'
        },
        {
          number: '213',
          name: 'The First Noel'
        },
        {
          number: '214',
          name: 'I Heard the Bells on Christmas Day'
        },
        {
          number: '215',
          name: 'Ring Out, Wild Bells'
        },
        {
          number: '216',
          name: 'We Are Sowing'
        },
        {
          number: '217',
          name: 'Come, Let Us Anew'
        },
        {
          number: '218',
          name: 'We Give Thee But Thine Own'
        },
        {
          number: '219',
          name: 'Because I Have Been Given Much'
        },
        {
          number: '220',
          name: 'Lord, I Would Follow Thee'
        },
        {
          number: '221',
          name: 'Dear to the Heart of the Shepherd'
        },
        {
          number: '222',
          name: 'Hear Thou Our Hymn, O Lord'
        },
        {
          number: '223',
          name: 'Have I Done Any Good?'
        },
        {
          number: '224',
          name: 'I Have Work Enough to Do'
        },
        {
          number: '225',
          name: 'We Are Marching On to Glory'
        },
        {
          number: '226',
          name: 'Improve the Shining Moments'
        },
        {
          number: '227',
          name: 'There Is Sunshine in My Soul Today'
        },
        {
          number: '228',
          name: 'You Can Make the Pathway Bright'
        },
        {
          number: '229',
          name: 'Today, While the Sun Shines'
        },
        {
          number: '230',
          name: 'Scatter Sunshine'
        },
        {
          number: '231',
          name: 'Father, Cheer Our Souls Tonight'
        },
        {
          number: '232',
          name: 'Let Us Oft Speak Kind Words'
        },
        {
          number: '233',
          name: 'Nay, Speak No Ill'
        },
        {
          number: '234',
          name: 'Jesus, Mighty King in Zion'
        },
        {
          number: '235',
          name: 'Should You Feel Inclined to Censure'
        },
        {
          number: '236',
          name: 'Lord, Accept into Thy Kingdom'
        },
        {
          number: '237',
          name: 'Do What Is Right'
        },
        {
          number: '238',
          name: 'Behold Thy Sons and Daughters, Lord'
        },
        {
          number: '239',
          name: 'Choose the Right'
        },
        {
          number: '240',
          name: 'Know This, That Every Soul Is Free'
        },
        {
          number: '241',
          name: 'Count Your Blessings'
        },
        {
          number: '242',
          name: 'Praise God, from Whom All Blessings Flow'
        },
        {
          number: '243',
          name: 'Let Us All Press On'
        },
        {
          number: '244',
          name: 'Come Along, Come Along'
        },
        {
          number: '245',
          name: 'This House We Dedicate to Thee'
        },
        {
          number: '246',
          name: 'Onward, Christian Soldiers'
        },
        {
          number: '247',
          name: 'We Love Thy House, O God'
        },
        {
          number: '248',
          name: 'Up, Awake, Ye Defenders of Zion'
        },
        {
          number: '249',
          name: 'Called to Serve'
        },
        {
          number: '250',
          name: 'We Are All Enlisted'
        },
        {
          number: '251',
          name: 'Behold! A Royal Army'
        },
        {
          number: '252',
          name: 'Put Your Shoulder to the Wheel'
        },
        {
          number: '253',
          name: 'Like Ten Thousand Legions Marching'
        },
        {
          number: '254',
          name: 'True to the Faith'
        },
        {
          number: '255',
          name: 'Carry On'
        },
        {
          number: '256',
          name: 'As Zion\'s Youth in Latter Days'
        },
        {
          number: '257',
          name: 'Rejoice! A Glorious Sound Is Heard'
        },
        {
          number: '258',
          name: 'O Thou Rock of Our Salvation'
        },
        {
          number: '259',
          name: 'Hope of Israel'
        },
        {
          number: '260',
          name: 'Who\'s on the Lord\'s Side?'
        },
        {
          number: '261',
          name: 'Thy Servants Are Prepared'
        },
        {
          number: '262',
          name: 'Go, Ye Messengers of Glory'
        },
        {
          number: '263',
          name: 'Go Forth with Faith'
        },
        {
          number: '264',
          name: 'Hark, All Ye Nations!'
        },
        {
          number: '265',
          name: 'Arise, O God, and Shine'
        },
        {
          number: '266',
          name: 'The Time Is Far Spent'
        },
        {
          number: '267',
          name: 'How Wondrous and Great'
        },
        {
          number: '268',
          name: 'Come, All Whose Souls Are Lighted'
        },
        {
          number: '269',
          name: 'Jehovah, Lord of Heaven and Earth'
        },
        {
          number: '270',
          name: 'I\'ll Go Where You Want Me to Go'
        },
        {
          number: '271',
          name: 'Oh, Holy Words of Truth and Love'
        },
        {
          number: '272',
          name: 'Oh Say, What Is Truth?'
        },
        {
          number: '273',
          name: 'Truth Reflects upon Our Senses'
        },
        {
          number: '274',
          name: 'The Iron Rod'
        },
        {
          number: '275',
          name: 'Men Are That They Might Have Joy'
        },
        {
          number: '276',
          name: 'Come Away to the Sunday School'
        },
        {
          number: '277',
          name: 'As I Search the Holy Scriptures'
        },
        {
          number: '278',
          name: 'Thanks for the Sabbath School'
        },
        {
          number: '279',
          name: 'Thy Holy Word'
        },
        {
          number: '280',
          name: 'Welcome, Welcome, Sabbath Morning'
        },
        {
          number: '281',
          name: 'Help Me Teach with Inspiration'
        },
        {
          number: '282',
          name: 'We Meet Again in Sabbath School'
        },
        {
          number: '283',
          name: 'The Glorious Gospel Light Has Shone'
        },
        {
          number: '284',
          name: 'If You Could Hie to Kolob'
        },
        {
          number: '285',
          name: 'God Moves in a Mysterious Way'
        },
        {
          number: '286',
          name: 'Oh, What Songs of the Heart'
        },
        {
          number: '287',
          name: 'Rise, Ye Saints, and Temples Enter'
        },
        {
          number: '288',
          name: 'How Beautiful Thy Temples, Lord'
        },
        {
          number: '289',
          name: 'Holy Temples on Mount Zion'
        },
        {
          number: '290',
          name: 'Rejoice, Ye Saints of Latter Days'
        },
        {
          number: '291',
          name: 'Turn Your Hearts'
        },
        {
          number: '292',
          name: 'O My Father'
        },
        {
          number: '293',
          name: 'Each Life That Touches Ours for Good'
        },
        {
          number: '294',
          name: 'Love at Home'
        },
        {
          number: '295',
          name: 'O Love That Glorifies the Son'
        },
        {
          number: '296',
          name: 'Our Father, by Whose Name'
        },
        {
          number: '297',
          name: 'From Homes of Saints Glad Songs Arise'
        },
        {
          number: '298',
          name: 'Home Can Be a Heaven on Earth'
        },
        {
          number: '299',
          name: 'Children of Our Heavenly Father'
        },
        {
          number: '300',
          name: 'Families Can Be Together Forever'
        },
        {
          number: '301',
          name: 'I Am a Child of God'
        },
        {
          number: '302',
          name: 'I Know My Father Lives'
        },
        {
          number: '303',
          name: 'Keep the Commandments'
        },
        {
          number: '304',
          name: 'Teach Me to Walk in the Light'
        },
        {
          number: '305',
          name: 'The Light Divine'
        },
        {
          number: '306',
          name: 'God\'s Daily Care'
        },
        {
          number: '307',
          name: 'In Our Lovely Deseret'
        },
        {
          number: '308',
          name: 'Love One Another'
        },
        {
          number: '309',
          name: 'As Sisters in Zion (Women)'
        },
        {
          number: '310',
          name: 'A Key Was Turned in Latter Days (Women)'
        },
        {
          number: '311',
          name: 'We Meet Again as Sisters (Women)'
        },
        {
          number: '312',
          name: 'We Ever Pray for Thee (Women)'
        },
        {
          number: '313',
          name: 'God Is Love (Women)'
        },
        {
          number: '314',
          name: 'How Gentle God\'s Commands (Women)'
        },
        {
          number: '315',
          name: 'Jesus, the Very Thought of Thee (Women)'
        },
        {
          number: '316',
          name: 'The Lord Is My Shepherd (Women)'
        },
        {
          number: '317',
          name: 'Sweet Is the Work (Women)'
        },
        {
          number: '318',
          name: 'Love at Home (Women)'
        },
        {
          number: '319',
          name: 'Ye Elders of Israel (Men)'
        },
        {
          number: '320',
          name: 'The Priesthood of Our Lord (Men)'
        },
        {
          number: '321',
          name: 'Ye Who Are Called to Labor (Men)'
        },
        {
          number: '322',
          name: 'Come, All Ye Sons of God (Men)'
        },
        {
          number: '323',
          name: 'Rise Up, O Men of God (Men\'s Choir)'
        },
        {
          number: '324',
          name: 'Rise Up, O Men of God (Men)'
        },
        {
          number: '325',
          name: 'See the Mighty Priesthood Gathered (Men\'s Choir)'
        },
        {
          number: '326',
          name: 'Come, Come, Ye Saints (Men\'s Choir)'
        },
        {
          number: '327',
          name: 'Go, Ye Messengers of Heaven (Men\'s Choir)'
        },
        {
          number: '328',
          name: 'An Angel from on High'
        },
        {
          number: '329',
          name: 'Thy Servants Are Prepared (Men\'s Choir)'
        },
        {
          number: '330',
          name: 'See, the Mighty Angel Flying (Men\'s Choir)'
        },
        {
          number: '331',
          name: 'Oh Say, What Is Truth? (Men\'s Choir)'
        },
        {
          number: '332',
          name: 'Come, O Thou King of Kings (Men\'s Choir)'
        },
        {
          number: '333',
          name: 'High on the Mountain Top (Men\'s Choir)'
        },
        {
          number: '334',
          name: 'I Need Thee Every Hour (Men\'s Choir)'
        },
        {
          number: '335',
          name: 'Brightly Beams Our Father\'s Mercy (Men\'s Choir)'
        },
        {
          number: '336',
          name: 'School Thy Feelings (Men\'s Choir)'
        },
        {
          number: '337',
          name: 'O Home Beloved (Men\'s Choir)'
        },
        {
          number: '338',
          name: 'America the Beautiful'
        },
        {
          number: '339',
          name: 'My Country, \'Tis of Thee'
        },
        {
          number: '340',
          name: 'The Star-Spangled Banner'
        },
        {
          number: '341',
          name: 'God Save the King'
        }
      ];
}

const { useState, useEffect, useRef } = React;

// ── DATA ─────────────────────────────────────────────────────────────────────

const STORIES = [
  { id:1, cat:'Family', catColor:'teal', title:'The First Trail: Why I Became a Hiking Dad at 38', excerpt:'I never hiked before she was born. Now the mountains feel like home. Here\'s how becoming a father led me to find myself outdoors.', author:'Marcus Webb', date:'Apr 18, 2026', img:'https://picsum.photos/seed/dad-trail/800/520', read:'7 min' },
  { id:2, cat:'Mental Health', catColor:'purple', title:'Talking to My Son About Anxiety: What I Wish Someone Had Told Me', excerpt:'The conversations no one prepared me for — and how stumbling through them brought us closer than I ever expected.', author:'David Park', date:'Apr 15, 2026', img:'https://picsum.photos/seed/dad-talk/800/520', read:'9 min' },
  { id:3, cat:'Milestones', catColor:'amber', title:'Dropping Her Off: The Quiet Grief of the First Day of Kindergarten', excerpt:'She walked in without looking back. I sat in my car for twenty minutes before I could drive.', author:'Sam Rivera', date:'Apr 12, 2026', img:'https://picsum.photos/seed/school-door/800/520', read:'5 min' },
  { id:4, cat:'Culture', catColor:'teal', title:'New Dad Groups Are Changing What Fatherhood Looks Like in America', excerpt:'From Seattle to Atlanta, a new generation of dads is building the support systems their own fathers never had.', author:'Jordan Ellis', date:'Apr 10, 2026', img:'https://picsum.photos/seed/dad-group/800/520', read:'11 min' },
  { id:5, cat:'Family', catColor:'teal', title:'Road School: What Six Weeks Driving Across the Country Taught My Kids', excerpt:'We traded the school calendar for the open road. My kids learned more in those six weeks than any classroom year.', author:'Tomas Reyes', date:'Apr 7, 2026', img:'https://picsum.photos/seed/road-trip/800/520', read:'14 min' },
  { id:6, cat:'Mental Health', catColor:'purple', title:'The Invisible Work: Emotional Labor and the Modern Father', excerpt:'We\'ve started sharing the dishes and the pickups. But the mental load? That\'s still mostly hers. Here\'s how I\'m trying to change that.', author:'Chris Fontaine', date:'Apr 3, 2026', img:'https://picsum.photos/seed/dad-home/800/520', read:'8 min' },
];

const BLOG_POSTS = [
  { id:1,  title:'Wonder',                          excerpt:'Sitting on the dock in Belize as the sun sets over the island in purple mist. The clouds lazily make their way toward the sun like the bears of the Grateful Dead, dancing along the horizon.',                                                        author:'Paul Marshall', date:'Apr 18, 2026', img:'images/5339E502-D488-4C90-BD8F-B08D37B7D4AA_1_105_c.jpeg', credit:true, tags:['Philosophy','Travel'] },
  { id:2,  title:'How Many Joules Does It Take',      excerpt:'My eight-year-old asked me "daddy, how do you measure energy?" Like Yoda, I felt like dying. What I realized is that everything is energy — a hug, joy, the sound of a dog\'s bark.',                                                           author:'Paul Marshall', date:'Apr 15, 2026', img:'https://picsum.photos/seed/dad-daughter-car/800/520', tags:['Philosophy'] },
  { id:3,  title:'City of Sound',                   excerpt:'I have a front-row seat to the chaos unfolding below in downtown Denver. Last night I watched the intersection next to the State Capitol turn to smoke and screeching tires.',                                                                  author:'Paul Marshall', date:'Apr 12, 2026', img:'images/105B453C-A9E5-4C99-8096-402387B267C9_1_105_c.jpeg', credit:true, tags:['Culture','Philosophy'] },
  { id:4,  title:'Concrete Rose',                   excerpt:'It\'s morning on a Monday / Solemn, quiet and cold / Memories flood my morning mind / With thought of life both new and old. / I sit in the stillness / And move with the noise.',                                                                 author:'Paul Marshall', date:'Apr 10, 2026', img:'images/IMG_4418.jpeg',      tags:['Poetry','Philosophy'] },
  { id:5,  title:'Corona Vision 2020',              excerpt:'I realized the problem was that I\'ve been sitting in the same spot, making all of my decisions based on one perspective. What else am I not seeing?',                                                                                          author:'Paul Marshall', date:'Apr 7, 2026',  img:'images/C962446E-F047-40AF-80BA-47EB7DBD27DB_1_105_c.jpeg', credit:true, tags:['Culture'] },
  { id:6,  title:'Daddy I Did It',                  excerpt:'"Daddy I did it!" — her proud excitement on the morning of her 5th birthday, having just tied her shoes for the first time. I don\'t know who was more proud, me or her younger sister.',                                                         author:'Paul Marshall', date:'Apr 4, 2026',  img:'images/1E02A35C-33BE-42E8-A289-FD851896BA66_1_105_c.jpeg', credit:true, tags:['Philosophy'] },
  { id:7,  title:'Dating as a Dad',                 excerpt:'Sarah told me she doesn\'t want me to have a girlfriend. She is only 4 years old. I chuckled and thought — you got it sweetheart, no girlfriend for daddy right now.',                                                                           author:'Paul Marshall', date:'Apr 1, 2026',  img:'https://picsum.photos/seed/single-dad/800/520',       tags:['Philosophy','Culture'] },
  { id:8,  title:"There'll Be Days Like This",      excerpt:'Van Morrison said "my mamma told me, there\'ll be days like this." I think of life as a pendulum — constantly swinging from happy to sad, peace to anger, good to bad.',                                                                       author:'Paul Marshall', date:'Mar 28, 2026', img:'images/F7677FAD-FB4D-4E87-97B6-8FF976022941_1_105_c.jpeg', credit:true, tags:['Music','Philosophy'] },
  { id:9,  title:'Life is a Storm',                 excerpt:'I recently went back to read a letter I wrote to myself on Dec 29, 2018. I do not remember writing it. But I am glad that I did. It was full of encouragement, joy and wisdom.',                                                               author:'Paul Marshall', date:'Mar 25, 2026', img:'images/D46248FC-3510-4423-AFB5-9321F23BD8BC_1_105_c.jpeg', credit:true, tags:['Philosophy'] },
  { id:10, title:'Innocents Abroad',                excerpt:'Travel is the only thing you can spend your money on that makes you richer. With each new place I visit, a new piece of me becomes more refined — a part I leave behind, a part I bring home.',                                               author:'Paul Marshall', date:'Mar 22, 2026', img:'images/5F7F7830-2BF4-4212-B264-D7085211EF2F_1_105_c.jpeg', credit:true, tags:['Travel','Philosophy'] },
  { id:11, title:'Dogs Like Blueberries',           excerpt:'"Alexa! Can dogs eat blueberries?!" shouts Sarah from the living room. Maggie sits patiently, full of anticipation. What followed was a masterclass in parenting two very different daughters.',                                               author:'Paul Marshall', date:'Mar 19, 2026', img:'images/48B0C675-FDB8-4B4B-846F-B38EFB3035C0_1_105_c.jpeg', credit:true, tags:['Philosophy'] },
  { id:12, title:'Food for Thought: You Are What You Feed',                excerpt:'You\'ve cultivated the information you consume, so it is the story you are telling yourself. The world is just a mirror reflecting back to you your thoughts.',                                                                                author:'Paul Marshall', date:'Mar 16, 2026', img:'https://picsum.photos/seed/social-mirror/800/520',     tags:['Philosophy'] },
  { id:13, title:'Higher Love',                     excerpt:'"Daddy, what does higher love mean?" From the back of the car, my eight-year-old had me stumped. A conversation about Kygo, Whitney Houston, and a six-year-old\'s unexpected wisdom.',                                                      author:'Paul Marshall', date:'Mar 13, 2026', img:'https://picsum.photos/seed/car-music/800/520',         tags:['Music','Philosophy'] },
  { id:14, title:'Feeling Groovy',                  excerpt:'Every night I put my daughters to bed with three songs. The one never argued over — "The 59th Street Bridge Song" by Simon and Garfunkel — has been with us since the day they were born.',                                                   author:'Paul Marshall', date:'Mar 10, 2026', img:'images/40490404-2959-42E2-91F5-1171559C45E3_1_105_c.jpeg', credit:true, tags:['Music','Philosophy'] },
  { id:15, title:'I Just Called to Say I Love You', excerpt:'My daughter called from her bedroom: "Daddy?!" "Yes, Sarah?" "I love you." My heart exploded. She just called to say I love you — like Stevie Wonder, but better.',                                                                           author:'Paul Marshall', date:'Mar 7, 2026',  img:'images/78805958-5BA1-4856-8821-9E8F5F5BA3F9_1_105_c.jpeg', credit:true, tags:['Music','Culture'] },
  { id:16, title:"It's Okay to Lick Dinosaurs",    excerpt:'I got to see my daughter growing up right before my eyes — dancing delicately in the Space Odyssey exhibit in her pink dress, her pigtails bouncing, a sweet smile across her face.',                                                         author:'Paul Marshall', date:'Mar 4, 2026',  img:'https://picsum.photos/seed/museum-kids/800/520',      tags:['Philosophy','Culture'] },
  { id:17, title:'Life in Technicolor',             excerpt:'Pleasantville is a story of self-discovery. People who see something inside themselves tend to glow in real life. The world is your kaleidoscope — in black and white, no fun at all.',                                                       author:'Paul Marshall', date:'Mar 1, 2026',  img:'images/026C432A-4B27-406B-AA4E-20E0C6F7AF14_4_5005_c.jpeg', credit:true, tags:['Culture','Philosophy'] },
  { id:18, title:'Masturdating',                    excerpt:'Masturdating: the act of taking oneself out on a date. From a Dead & Company show in Boulder to a solo week in Havana, Cuba — making the most of me makes me one grateful dad.',                                                            author:'Paul Marshall', date:'Feb 26, 2026', img:'images/D956DADA-87EE-4966-81D6-F70AFC28205B_1_105_c.jpeg', credit:true, tags:['Travel','Music','Philosophy'] },
  { id:19, title:'Me, Myself & Ireland',            excerpt:'I am nestled in a grand leather sofa next to a fire in the basement lounge of a hotel in Killarney. The Ring of Kerry, the Cliffs of Moher, Dingle — and the lesson that solo travel teaches like nothing else.',                          author:'Paul Marshall', date:'Feb 23, 2026', img:'images/8E4347AD-48B5-4AE7-89ED-9E06FA2CD734_1_105_c.jpeg', credit:true, tags:['Travel','Philosophy'] },
  { id:20, title:'Grapple',                         excerpt:'"Daddy, I\'ll say a word and then we have to think of words that rhyme. Apple." She stumped me. And from that simple game, a meditation on the meaning of life — Viktor Frankl included.',                                                  author:'Paul Marshall', date:'Feb 20, 2026', img:'https://picsum.photos/seed/school-morning/800/520',    tags:['Philosophy'] },
  { id:21, title:'Meditation',                      excerpt:'A Sunday school teacher once told me meditation was part of Satan\'s plan. Thirty years later, I average 14 minutes a day and over 30 total hours — and it has changed everything.',                                                         author:'Paul Marshall', date:'Feb 17, 2026', img:'https://picsum.photos/seed/meditation-peace/800/520',  tags:['Philosophy'] },
  { id:22, title:"Oh, The Places You'll Go",        excerpt:'Lying face up in a plastic tote on an Amazon conveyor belt — "Oh, the Places You\'ll Go" by Dr. Seuss. The irony was not lost on me. Neither was the lesson.',                                                                               author:'Paul Marshall', date:'Feb 14, 2026', img:'https://picsum.photos/seed/dr-seuss-book/800/520',     tags:['Philosophy','Culture'] },
  { id:23, title:'Perfect is Boring',               excerpt:'My friend said it best: perfect is boring. We were talking about how crazy the world is and how we strive to mimic the images we see online every single day.',                                                                               author:'Paul Marshall', date:'Feb 11, 2026', img:'https://picsum.photos/seed/perfect-boring/800/520',    tags:['Philosophy','Culture'] },
  { id:24, title:'Pura Vida',                       excerpt:'"Pura Vida" — pure life. The common phrase of Costa Rica, stated with genuine feel each time. A Christmas road trip that inspired me to think about how to live a life worth reliving.',                                                     author:'Paul Marshall', date:'Feb 8, 2026',  img:'images/7BACF934-C6EC-4DC3-9242-0CB14B40E2CD_1_105_c.jpeg', credit:true, tags:['Travel','Philosophy'] },
  { id:25, title:'Pure Imagination',                excerpt:'I was listening to Kanye West on Joe Rogan and realized his mind is like a lot of people\'s — mine included. A symphony of ideas that never turns off. On mental health, social media, and hope.',                                          author:'Paul Marshall', date:'Feb 5, 2026',  img:'https://picsum.photos/seed/mind-thoughts/800/520',    tags:['Culture','Philosophy','Music'] },
  { id:26, title:'All is Not Lost',                 excerpt:'Just outside of Jaco, Costa Rica, down a jungle road is the start of a hidden trail. Waterfalls, a mystery Jeep with keys in the dash — and a lesson on losing from Michael Jordan.',                                                     author:'Paul Marshall', date:'Feb 2, 2026',  img:'images/24A6D719-B366-4B54-B631-DA900E5F01FE_1_105_c.jpeg', credit:true, tags:['Travel','Philosophy'] },
  { id:27, title:'Selfie Conscious',                excerpt:'I used to be really insecure about taking selfies. I have more pictures of my daughters from last year than I have of myself from the first 30 years of my life.',                                                                             author:'Paul Marshall', date:'Jan 30, 2026', img:'https://picsum.photos/seed/selfie-museum/800/520',     tags:['Culture','Philosophy'] },
  { id:28, title:'Binary Stars',                    excerpt:'In a binary star system, stars orbit around the same barycenter and shine so brightly they appear to be one single point of light. A cosmic analogy for love, loss, and dating with kids.',                                                  author:'Paul Marshall', date:'Jan 27, 2026', img:'https://picsum.photos/seed/binary-stars/800/520',      tags:['Philosophy'] },
  { id:29, title:'Soul Surfing',                    excerpt:'I take a night, a weekend, a trip, and use the time to ride the waves of thoughts and emotions as they come. Tonight\'s episode is brought to you by MDMA — and an honest conversation about substances.',                                  author:'Paul Marshall', date:'Jan 24, 2026', img:'images/0E7C5DA3-3FE4-4CAE-A961-1F552548C1B7_1_105_c.jpeg', credit:true, tags:['Psychedelics','Philosophy'] },
  { id:30, title:'The Mountains Are Calling',       excerpt:'He could feel the pull on him deep within, as if it was trying to turn him inside out. On the other side of his soul is the universe — brilliant, busy, a night sky, endless and infinite.',                                              author:'Paul Marshall', date:'Jan 21, 2026', img:'images/C7A6B65E-A6B2-426B-B353-0AF0568AF9A2_1_105_c.jpeg', credit:true, tags:['Philosophy','Travel'] },
  { id:31, title:'Papa',                            excerpt:'Papa died this weekend. He was the Patron of our family — a caring and steadfast man. How do you talk to a 4 and 6 year old about death? The answer starts with listening.',                                                                author:'Paul Marshall', date:'Jan 18, 2026', img:'images/417AA171-A968-4EB7-81B8-86F0BE597C13_1_105_c.jpeg', credit:true, tags:['Philosophy','Culture'] },
  { id:32, title:'Writing Down Your Soul',          excerpt:'My great-grandfather wrote a letter to my Papa 76 years ago: "A lifetime isn\'t long enough." These words, written months before he died, traveled through time to find me exactly when I needed them.',                                  author:'Paul Marshall', date:'Jan 15, 2026', img:'https://picsum.photos/seed/letter-writing/800/520',    tags:['Philosophy'] },
  { id:33, title:'Here Ya Go, Peace Out',            excerpt:'Sometimes after a great few days with my kids, I drop them off and feel the loss deep within my core the second I walk away. Other days? "Here ya go! Peace out!" It all depends on the week.',                                          author:'Paul Marshall', date:'Jan 12, 2026', img:'https://picsum.photos/seed/kids-transition/800/520',   tags:['Philosophy'] },
  { id:34, title:'Heart of Darkness',               excerpt:'Once upon a time, I stepped across the border of Rwanda into Goma in the Democratic Republic of Congo. What I experienced there — and what I found years later in a Bahamian neighborhood — changed how I parent.',                       author:'Paul Marshall', date:'Jan 9, 2026',  img:'images/8A32CCF9-3659-45EC-8602-015FF78AB8BD_1_105_c.jpeg', credit:true, tags:['Travel','Culture','Philosophy'] },
  { id:35, title:'Venus',                           excerpt:'The planet Venus is the brightest object in the night sky after the moon — always the first light out at dusk. I bought my daughters a telescope, and what they taught me was bigger than any star.',                                     author:'Paul Marshall', date:'Jan 6, 2026',  img:'images/FF140C24-18B4-4F34-93BC-CE4255CD9519_1_105_c.jpeg', credit:true, tags:['Philosophy'] },
  { id:36, title:'Life Comes in Waves',             excerpt:'My daughter broke down about moving and the constant change — unable to breathe because of the waves life was crashing down on her. All I could do was be her life jacket.',                                                               author:'Paul Marshall', date:'Jan 3, 2026',  img:'https://picsum.photos/seed/ocean-waves/800/520',      tags:['Philosophy','Travel'] },
  { id:37, title:'Weakened Mind',                   excerpt:'Some days I feel like I\'m losing my mind. At the end of each day I\'m exhausted yet look back and can\'t figure out what I actually did. Life came to a halt while the earth continued to spin.',                                       author:'Paul Marshall', date:'Dec 31, 2025',img:'https://picsum.photos/seed/exhausted-night/800/520',   tags:['Philosophy','Culture'] },
  { id:38, title:'The Finer Things',                excerpt:'"While there is time, let\'s go out and feel everything." The opening lines of The Finer Things by Steve Winwood have been on my playlists and mixed tapes since I was a teenager.',                                                      author:'Paul Marshall', date:'Dec 28, 2025',img:'images/AE9AB0EB-0D51-4714-A4C4-567375B4B385_1_105_c.jpeg', credit:true, tags:['Music','Philosophy'] },
  { id:39, title:'Wildflowers',                     excerpt:'At 13,000 feet, wildflowers live in an almost indestructible fashion — wind powerful enough to move the landscape, brutally chilled temperatures. And yet, life still finds a way.',                                                       author:'Paul Marshall', date:'Dec 25, 2025',img:'images/07ED77B9-63DE-4C11-80D9-802DC4AC8430_1_105_c.jpeg', credit:true, tags:['Music','Philosophy'] },
  { id:40, title:"Won't You Be My Neighbor",        excerpt:'Fred Rogers didn\'t just preach kindness — he actually lived it. As I sat watching downtown Denver go quiet during COVID, I thought about what a chance we all had to leave our own legacy.',                                             author:'Paul Marshall', date:'Dec 22, 2025',img:'https://picsum.photos/seed/neighborhood/800/520',       tags:['Culture','Philosophy'] },
  { id:41, title:'What World Are You Going To Next?', excerpt:'I saw a meme pulling out from stars to galaxies to universes. The scope of existence is incomprehensible. But the world I care most about lives inside two little girls.',                                                                  author:'Paul Marshall', date:'Dec 19, 2025',img:'https://picsum.photos/seed/universe-worlds/800/520',    tags:['Philosophy'] },
  { id:42, title:'Yippee Ki-Yay Christmas',         excerpt:'The number one question of the holiday season: is Die Hard a Christmas movie? The more pressing question for me was whether I should let my kids watch it at all. The answer surprised us all.',                                          author:'Paul Marshall', date:'Dec 16, 2025',img:'https://picsum.photos/seed/christmas-night/800/520',    tags:['Culture','Philosophy'] },
  { id:43, title:"You Can't Always Get What You Want", excerpt:'I have a Spotify playlist called "Songs in the Key of Life." One difficult night, drowning my sorrows in scotch and Thai food, the Rolling Stones taught me the difference between want and need.',                               author:'Paul Marshall', date:'Dec 13, 2025',img:'https://picsum.photos/seed/rolling-stones-kitchen/800/520',tags:['Music','Philosophy','Food'] },
  { id:44, title:'Sex, Drugs & Rock N Roll',        excerpt:'"You don\'t owe anyone an explanation for how you live your life." I\'d never heard those words before, but I felt them immediately. And now I\'m figuring out how to raise my daughters to feel them too.',                              author:'Paul Marshall', date:'Dec 10, 2025',img:'https://picsum.photos/seed/freedom-life/800/520',       tags:['Philosophy','Culture','Psychedelics'] },
  { id:45, title:'Astral Weeks',                     excerpt:'I was 14, sitting in a library booth with foam headphones, when Van Morrison\'s voice emerged and I was gone. For seven minutes and six seconds I entered another world — and I\'ve been returning ever since.',                author:'Paul Marshall', date:'Apr 22, 2026', img:'images/Astral Weeks.webp', tags:['Music','Travel','Philosophy'] },
  { id:46, title:'Havana Panorama',                  excerpt:'On my first day in Cuba, I watched three guys cut off the heads of a chicken and a dove in the kitchen of my host family. And somehow, it only got more interesting from there.',                                                        author:'Paul Marshall', date:'Nov 1, 2024',  img:'images/1FDEDDCC-AD51-443E-9781-EEF7482BE2F9_1_105_c.jpeg', credit:true, tags:['Travel','Culture','Food','Music'] },
  { id:47, title:'Moab',                             excerpt:'Even the name emits a deep tone when you say it. Like the name of an ancient god, when uttered shakes the ground and rumbles the valleys. Ancient rock formations that stand the test of time.',                                                              author:'Paul Marshall', date:'May 1, 2024',  img:'images/38FF8C10-B7BD-42F6-80C3-1BC498F67410_1_105_c.jpeg', credit:true, tags:['Travel','Philosophy'] },
  { id:48, title:'Dadventure in the Desert',         excerpt:'So this is a story about what happened when I ate some mushrooms in the Sahara Desert outside of Merzouga, Morocco. One might argue this is a story about nothing. Like Seinfeld. But I\'m going to try and make it about something.',                   author:'Paul Marshall', date:'Apr 24, 2026', img:'images/IMG_7871.jpeg', credit:true, tags:['Travel','Psychedelics','Philosophy'] },
];


// ── IMAGE RESOLVER ───────────────────────────────────────────────────────────
const BLOG_IMG_MAP = {
  'images/5339E502-D488-4C90-BD8F-B08D37B7D4AA_1_105_c.jpeg': 'images/5339E502-D488-4C90-BD8F-B08D37B7D4AA_1_105_c.jpeg',
  'images/105B453C-A9E5-4C99-8096-402387B267C9_1_105_c.jpeg': 'images/105B453C-A9E5-4C99-8096-402387B267C9_1_105_c.jpeg',
  'images/IMG_4418.jpeg': 'images/IMG_4418.jpeg',
  'images/C962446E-F047-40AF-80BA-47EB7DBD27DB_1_105_c.jpeg': 'images/C962446E-F047-40AF-80BA-47EB7DBD27DB_1_105_c.jpeg',
  'images/1E02A35C-33BE-42E8-A289-FD851896BA66_1_105_c.jpeg': 'images/1E02A35C-33BE-42E8-A289-FD851896BA66_1_105_c.jpeg',
  'images/F7677FAD-FB4D-4E87-97B6-8FF976022941_1_105_c.jpeg': 'images/F7677FAD-FB4D-4E87-97B6-8FF976022941_1_105_c.jpeg',
  'images/D46248FC-3510-4423-AFB5-9321F23BD8BC_1_105_c.jpeg': 'images/D46248FC-3510-4423-AFB5-9321F23BD8BC_1_105_c.jpeg',
  'images/5F7F7830-2BF4-4212-B264-D7085211EF2F_1_105_c.jpeg': 'images/5F7F7830-2BF4-4212-B264-D7085211EF2F_1_105_c.jpeg',
  'images/48B0C675-FDB8-4B4B-846F-B38EFB3035C0_1_105_c.jpeg': 'images/48B0C675-FDB8-4B4B-846F-B38EFB3035C0_1_105_c.jpeg',
  'images/40490404-2959-42E2-91F5-1171559C45E3_1_105_c.jpeg': 'images/40490404-2959-42E2-91F5-1171559C45E3_1_105_c.jpeg',
  'images/78805958-5BA1-4856-8821-9E8F5F5BA3F9_1_105_c.jpeg': 'images/78805958-5BA1-4856-8821-9E8F5F5BA3F9_1_105_c.jpeg',
  'images/026C432A-4B27-406B-AA4E-20E0C6F7AF14_4_5005_c.jpeg': 'images/026C432A-4B27-406B-AA4E-20E0C6F7AF14_4_5005_c.jpeg',
  'images/D956DADA-87EE-4966-81D6-F70AFC28205B_1_105_c.jpeg': 'images/D956DADA-87EE-4966-81D6-F70AFC28205B_1_105_c.jpeg',
  'images/8E4347AD-48B5-4AE7-89ED-9E06FA2CD734_1_105_c.jpeg': 'images/8E4347AD-48B5-4AE7-89ED-9E06FA2CD734_1_105_c.jpeg',
  'images/7BACF934-C6EC-4DC3-9242-0CB14B40E2CD_1_105_c.jpeg': 'images/7BACF934-C6EC-4DC3-9242-0CB14B40E2CD_1_105_c.jpeg',
  'images/24A6D719-B366-4B54-B631-DA900E5F01FE_1_105_c.jpeg': 'images/24A6D719-B366-4B54-B631-DA900E5F01FE_1_105_c.jpeg',
  'images/0E7C5DA3-3FE4-4CAE-A961-1F552548C1B7_1_105_c.jpeg': 'images/0E7C5DA3-3FE4-4CAE-A961-1F552548C1B7_1_105_c.jpeg',
  'images/C7A6B65E-A6B2-426B-B353-0AF0568AF9A2_1_105_c.jpeg': 'images/C7A6B65E-A6B2-426B-B353-0AF0568AF9A2_1_105_c.jpeg',
  'images/417AA171-A968-4EB7-81B8-86F0BE597C13_1_105_c.jpeg': 'images/417AA171-A968-4EB7-81B8-86F0BE597C13_1_105_c.jpeg',
  'images/8A32CCF9-3659-45EC-8602-015FF78AB8BD_1_105_c.jpeg': 'images/8A32CCF9-3659-45EC-8602-015FF78AB8BD_1_105_c.jpeg',
  'images/FF140C24-18B4-4F34-93BC-CE4255CD9519_1_105_c.jpeg': 'images/FF140C24-18B4-4F34-93BC-CE4255CD9519_1_105_c.jpeg',
  'images/AE9AB0EB-0D51-4714-A4C4-567375B4B385_1_105_c.jpeg': 'images/AE9AB0EB-0D51-4714-A4C4-567375B4B385_1_105_c.jpeg',
  'images/07ED77B9-63DE-4C11-80D9-802DC4AC8430_1_105_c.jpeg': 'images/07ED77B9-63DE-4C11-80D9-802DC4AC8430_1_105_c.jpeg',
  'images/Astral Weeks.webp': 'images/Astral Weeks.webp',
  'images/1FDEDDCC-AD51-443E-9781-EEF7482BE2F9_1_105_c.jpeg': 'images/1FDEDDCC-AD51-443E-9781-EEF7482BE2F9_1_105_c.jpeg',
  'images/38FF8C10-B7BD-42F6-80C3-1BC498F67410_1_105_c.jpeg': 'images/38FF8C10-B7BD-42F6-80C3-1BC498F67410_1_105_c.jpeg',
  'images/IMG_7871.jpeg': 'images/IMG_7871.jpeg'
};
const resolveImg = (path) => BLOG_IMG_MAP[path] || path;

const GEAR = [
  { id:1, cat:'Outdoor', title:'Osprey Poco Plus Child Carrier', note:'The gold standard for hiking with littles. Adjustable torso, kickstand, sunhood — we\'ve logged 200+ miles in this.', price:'$299', rating:5, img:'https://picsum.photos/seed/gear-carrier/600/400' },
  { id:2, cat:'Tech', title:'Garmin inReach Mini 2', note:'Two-way satellite communicator. When you\'re deep in the backcountry with your kid, this is peace of mind.', price:'$349', rating:5, img:'https://picsum.photos/seed/gear-garmin/600/400' },
  { id:3, cat:'Home', title:'Nugget Play Couch', note:'It\'s a couch. It\'s a fort. It\'s a slide. It\'s somehow worth it. Our kids have touched nothing else for three months.', price:'$269', rating:4, img:'https://picsum.photos/seed/gear-nugget/600/400' },
  { id:4, cat:'On-the-Go', title:'Thule Urban Glide 3 Stroller', note:'Smooth enough for trail running with a toddler. Light enough to fold with one hand. The engineering is outstanding.', price:'$749', rating:5, img:'https://picsum.photos/seed/gear-stroller/600/400' },
  { id:5, cat:'Outdoor', title:'BioLite CampStove 2+', note:'Burn sticks, charge your phone, cook breakfast. Showing your kid fire-as-technology is one of the coolest parenting moves.', price:'$149', rating:4, img:'https://picsum.photos/seed/gear-stove/600/400' },
  { id:6, cat:'Tech', title:'Kindle Paperwhite Kids', note:'Durable, waterproof, pre-loaded library. No ads, no YouTube rabbit holes. A rare tech win.', price:'$159', rating:5, img:'https://picsum.photos/seed/gear-kindle/600/400' },
  { id:7, cat:'Home', title:'Hatch Rest 2nd Gen', note:'The sleep device that actually works. We have three. There\'s no shame in it.', price:'$89', rating:5, img:'https://picsum.photos/seed/gear-hatch/600/400' },
  { id:8, cat:'On-the-Go', title:'Yeti Rambler Jr. 12oz', note:'Indestructible, keeps things cold/hot, easy grip. They will lose it. Buy two.', price:'$30', rating:4, img:'https://picsum.photos/seed/gear-yeti/600/400' },
];

const DESTINATIONS = [
  { id:1, region:'Pacific Northwest', title:'Olympic Peninsula with Kids: The Complete Dad\'s Guide', sub:'Rainforests, tide pools, elk meadows — and a 5-year-old who hiked 8 miles.', img:'https://picsum.photos/seed/olympic/900/560', duration:'5 Days', age:'3+' },
  { id:2, region:'Southwest', title:'Sedona in Red: Canyons, Vortexes, and Bedtime at 7pm', sub:'The rock formations aren\'t the only thing that\'ll take your breath away.', img:'https://picsum.photos/seed/sedona/900/560', duration:'4 Days', age:'5+' },
  { id:3, region:'Northeast', title:'Acadia National Park: First Camping Trip With a Baby', sub:'We brought a 9-month-old to the Maine coast. It went better than expected. Here\'s how.', img:'https://picsum.photos/seed/acadia/900/560', duration:'3 Days', age:'0+' },
  { id:4, region:'International', title:'Tokyo With Toddlers: A Field Report', sub:'Efficient trains, vending machines at every corner, and a city that somehow loves your kids more than you do.', img:'https://picsum.photos/seed/tokyo-family/900/560', duration:'10 Days', age:'2+' },
  { id:5, region:'Mountain West', title:'Telluride to Moab: The Ultimate Dad Road Trip Loop', sub:'1,200 miles, 3 National Parks, 2 kids in the back seat. Here\'s the route we\'d take again tomorrow.', img:'https://picsum.photos/seed/moab/900/560', duration:'8 Days', age:'4+' },
];

// Rainbow gradient matching the Dadventure logo
const LOGO_GRADIENT = 'linear-gradient(90deg, #E86830 0%, #D4446A 22%, #9B50C8 44%, #5B6BD4 62%, #38B8B0 80%, #3DCCA0 100%)';

const BLOG_CATS = ['All','Travel','Music','Food','Culture','Philosophy','Psychedelics','Poetry'];
const CAT_COLORS = {
  Travel:      { bg:'rgba(232,104,48,0.15)',  text:'#F0925A' },
  Music:       { bg:'rgba(212,68,106,0.15)',  text:'#E87090' },
  Food:        { bg:'rgba(200,120,60,0.15)',  text:'#E8A060' },
  Culture:     { bg:'rgba(155,80,200,0.15)',  text:'#C080E8' },
  Philosophy:  { bg:'rgba(91,107,212,0.15)', text:'#8899E8' },
  Psychedelics:{ bg:'rgba(56,184,176,0.15)', text:'#5AD4CE' },
  Poetry:      { bg:'rgba(61,204,160,0.15)', text:'#50DCAA' },
};

const TagPill = ({ tag }) => {
  const c = CAT_COLORS[tag] || CAT_COLORS.Philosophy;
  return (
    <span style={{
      display:'inline-block', fontSize:10, fontWeight:700,
      letterSpacing:'0.12em', textTransform:'uppercase',
      padding:'3px 10px', borderRadius:3,
      background:c.bg, color:c.text, marginRight:5, marginBottom:4,
    }}>{tag}</span>
  );
};

// ── COMPONENTS ────────────────────────────────────────────────────────────────

// Compass Logo SVG
const CompassLogo = ({ size = 40 }) => (
  <img
    src={'images/logo.png'}
    alt="Dadventure"
    style={{ width: size, height: size, objectFit: 'contain' }}
  />
);

// Category badge
const Badge = ({ cat, color }) => {
  const colors = {
    teal:   { bg: 'oklch(57% 0.14 192 / 0.18)', text: 'oklch(68% 0.11 192)' },
    purple: { bg: 'oklch(52% 0.19 285 / 0.18)', text: 'oklch(62% 0.15 285)' },
    amber:  { bg: 'oklch(72% 0.14 66 / 0.18)', text: 'oklch(82% 0.10 66)' },
  };
  const c = colors[color] || colors.teal;
  return (
    <span style={{
      display: 'inline-block',
      background: c.bg,
      color: c.text,
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      padding: '3px 10px',
      borderRadius: 3,
    }}>{cat}</span>
  );
};

// Star rating
const Stars = ({ n }) => (
  <span style={{ color: 'oklch(72% 0.14 66)', fontSize: 13 }}>
    {'★'.repeat(n)}{'☆'.repeat(5-n)}
  </span>
);

// ── HEADER ────────────────────────────────────────────────────────────────────
const Header = ({ page, setPage, scrolled }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const nav = ['Home','About','News & Stories','Blog','Events','Resources','Founding Fathers'];
  const resourcePages = ['Gear','Travel','Social','DadDinner','DadAdventures','GetInvolved'];

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(12,13,20,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all 0.3s ease',
      padding: '0 40px',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 68,
      }}>
        {/* Logo */}
        <button onClick={() => setPage('Home')} style={{
          background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <CompassLogo size={44} />
          <span style={{
            fontFamily: 'var(--serif)', fontWeight: 700, fontSize: 20,
            letterSpacing: '-0.01em', color: 'var(--text)',
          }}>
            <span style={{ color: 'var(--amber)' }}>Dad</span>venture
          </span>
        </button>

        {/* Nav */}
        <nav style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {nav.map(n => n === 'Resources' ? (
            <div key="Resources" style={{ position: 'relative' }}
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}>
              <button onClick={() => setPage('Resources')} style={{
                background: 'none', border: 'none',
                fontSize: 13, fontWeight: (page === 'Resources' || resourcePages.includes(page)) ? 600 : 400,
                color: (page === 'Resources' || resourcePages.includes(page)) ? 'var(--text)' : 'var(--muted)',
                padding: '6px 14px', borderRadius: 4, cursor: 'pointer',
                transition: 'color 0.2s', letterSpacing: '0.01em',
                display: 'flex', alignItems: 'center', gap: 4, position: 'relative',
              }}>
                Resources
                <span style={{ fontSize: 9, opacity: 0.6 }}>▾</span>
                {(page === 'Resources' || resourcePages.includes(page)) && (
                  <span style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:20, height:2, background:'linear-gradient(90deg, var(--purple), var(--teal))', borderRadius:1 }} />
                )}
              </button>
              {resourcesOpen && (
                <div style={{ position:'absolute', top:'100%', left:'50%', transform:'translateX(-50%)', background:'rgba(18,20,30,0.98)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:10, padding:'8px', minWidth:220, zIndex:200, boxShadow:'0 20px 60px rgba(0,0,0,0.5)' }}>
                  <div style={{ padding:'8px 12px 6px', fontSize:10, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--subtle)' }}>Dad Resources</div>
                  {[
                    { page:'Gear',          label:'Gear Reviews',       desc:'Honest picks from the field',       icon:'🎒' },
                    { page:'Travel',        label:'Travel Guides',      desc:'Destinations for dads + kids',      icon:'🗺️' },
                    { page:'Social',        label:'Community',          desc:'Support, ideas & connection',       icon:'🤝' },
                    { page:'DadDinner',     label:'Dad Does Dinner',    desc:'Easy recipes worth making together',icon:'🍳' },
                    { page:'DadAdventures', label:'1-Hour Dadventures', desc:'Quick adventures, big memories',    icon:'⚡' },
                    { page:'GetInvolved',   label:'Get Involved',       desc:'Ways to show up and give back',     icon:'🌱' },
                  ].map(item => (
                    <button key={item.page} onClick={() => { setPage(item.page); setResourcesOpen(false); }} style={{ width:'100%', background: page===item.page ? 'rgba(155,80,200,0.12)' : 'none', border:'none', borderRadius:7, padding:'10px 12px', cursor:'pointer', display:'flex', gap:12, alignItems:'center', textAlign:'left', transition:'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.06)'}
                      onMouseLeave={e => e.currentTarget.style.background= page===item.page ? 'rgba(155,80,200,0.12)' : 'none'}>
                      <span style={{ fontSize:20 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>{item.label}</div>
                        <div style={{ fontSize:11, color:'var(--subtle)', marginTop:1 }}>{item.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <button key={n} onClick={() => setPage(n)} style={{
              background: 'none', border: 'none',
              fontSize: 13, fontWeight: page === n ? 600 : 400,
              color: page === n ? 'var(--text)' : 'var(--muted)',
              padding: '6px 14px', borderRadius: 4, position: 'relative',
              transition: 'color 0.2s', letterSpacing: '0.01em', cursor: 'pointer',
            }}>
              {n}
              {page === n && (
                <span style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:20, height:2, background:'linear-gradient(90deg, var(--purple), var(--teal))', borderRadius:1 }} />
              )}
            </button>
          ))}
        </nav>

        {/* Subscribe CTA */}
        <button onClick={() => setPage('Subscribe')} style={{
          background: 'linear-gradient(135deg, var(--teal), var(--amber))',
          border: 'none', color: '#0c0d14',
          padding: '8px 20px', borderRadius: 6,
          fontSize: 13, fontWeight: 700,
          letterSpacing: '0.02em',
          cursor: 'pointer',
        }}>
          Subscribe
        </button>
      </div>
    </header>
  );
};

// ── SECTION HEADER ────────────────────────────────────────────────────────────
const SectionHead = ({ label, title, sub, center }) => (
  <div style={{ textAlign: center ? 'center' : 'left', marginBottom: 40 }}>
    <div className="label label-accent" style={{ marginBottom: 12 }}>{label}</div>
    <h2 style={{
      fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3vw, 40px)',
      fontWeight: 700, lineHeight: 1.15, color: 'var(--text)',
      marginBottom: sub ? 14 : 0,
    }}>{title}</h2>
    {sub && <p style={{ color: 'var(--muted)', fontSize: 16, maxWidth: 560, margin: center ? '0 auto' : '0' }}>{sub}</p>}
  </div>
);

// ── STORY CARD ────────────────────────────────────────────────────────────────
const StoryCard = ({ story, featured, setPage }) => (
  <article
    onClick={() => {}}
    className={featured ? '' : ''}
    style={{
      background: 'var(--bg2)',
      borderRadius: 8,
      overflow: 'hidden',
      border: '1px solid var(--border)',
      cursor: 'pointer',
      transition: 'transform 0.2s, border-color 0.2s',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'var(--bg4)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'var(--border)'; }}
  >
    <div className="img-overlay" style={{ height: featured ? 320 : 220, overflow: 'hidden' }}>
      <img src={story.img} alt={story.title} style={{ height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
    </div>
    <div style={{ padding: featured ? '28px 28px 24px' : '20px 20px 18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <Badge cat={story.cat} color={story.catColor} />
        <span style={{ fontSize: 11, color: 'var(--subtle)' }}>{story.read} read</span>
      </div>
      <h3 style={{
        fontFamily: 'var(--serif)',
        fontSize: featured ? 22 : 17,
        fontWeight: 700, lineHeight: 1.3,
        color: 'var(--text)', marginBottom: 10,
        textWrap: 'pretty',
      }}>{story.title}</h3>
      <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 14 }}>{story.excerpt}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--purple), var(--teal))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 600, color: 'white',
          flexShrink: 0,
        }}>{story.author.split(' ').map(w=>w[0]).join('')}</div>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>{story.author}</span>
        <span style={{ fontSize: 12, color: 'var(--subtle)', marginLeft: 'auto' }}>{story.date}</span>
      </div>
    </div>
  </article>
);

// ── RSS FEED SECTION ─────────────────────────────────────────────────────────
const RSS_SOURCES = [
  { name: 'Fatherly',     url: 'https://www.fatherly.com/feed/',                          color: 'var(--teal2)'   },
  { name: 'NYT Parenting',url: 'https://www.nytimes.com/section/parenting/rss.xml',       color: 'var(--amber2)'  },
  { name: 'Parents',      url: 'https://www.parents.com/parenting/rss.xml',               color: 'var(--purple2)' },
  { name: 'The Dad',      url: 'https://thedad.com/feed/',                                color: 'var(--teal2)'   },
];

const RssFeedSection = () => {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
  const [active, setActive]   = useState('All');
  const rowRef = useRef(null);

  const fetchFeed = async (src) => {
    const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(src.url)}&count=6`;
    try {
      const r = await fetch(api);
      const d = await r.json();
      if (d.status !== 'ok') return [];
      return d.items.map(item => ({
        title:       item.title,
        link:        item.link,
        pubDate:     item.pubDate ? new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '',
        thumbnail:   item.thumbnail || item.enclosure?.link || null,
        description: item.description ? item.description.replace(/<[^>]+>/g, '').slice(0, 120) + '…' : '',
        source:      src.name,
        sourceColor: src.color,
      }));
    } catch { return []; }
  };

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all(RSS_SOURCES.map(fetchFeed)).then(results => {
      if (cancelled) return;
      const merged = results.flat().sort(() => Math.random() - 0.5);
      if (merged.length) {
        setItems(merged);
      } else {
        // Fallback articles shown when RSS feeds are unavailable (e.g. in preview)
        setItems([
          { title:'The Science of Why Dads Play Differently — And Why It Matters', link:'#', pubDate:'Apr 24', thumbnail:null, description:'Research shows that roughhousing, risk-taking and unpredictability in dad play builds resilience and emotional regulation in kids.', source:'Fatherly', sourceColor:'var(--teal2)' },
          { title:'How to Talk to Your Kids About Hard Things Without Shutting Down', link:'#', pubDate:'Apr 23', thumbnail:null, description:'Child psychologists share the language that keeps kids talking — even when the conversation is uncomfortable.', source:'NYT Parenting', sourceColor:'var(--amber2)' },
          { title:'The 10-Minute Morning Routine That Changes How Your Kid Starts the Day', link:'#', pubDate:'Apr 22', thumbnail:null, description:'It\'s not about productivity. It\'s about connection — and it takes less time than you think.', source:'Parents', sourceColor:'var(--purple2)' },
          { title:'Single Dads Are Rewriting What Fatherhood Looks Like in America', link:'#', pubDate:'Apr 21', thumbnail:null, description:'From shared custody to solo parenting, a new generation of dads is building the playbook from scratch.', source:'The Dad', sourceColor:'var(--teal2)' },
          { title:'Why Your Kid Needs You to Be Bored With Them', link:'#', pubDate:'Apr 20', thumbnail:null, description:'Unstructured time together — with no agenda — is one of the most powerful things a parent can give.', source:'Fatherly', sourceColor:'var(--teal2)' },
          { title:'The Mental Load of Fatherhood Nobody Talks About', link:'#', pubDate:'Apr 19', thumbnail:null, description:'Dads are carrying more than ever. Here\'s how to name it, share it, and stop letting it quietly run you down.', source:'NYT Parenting', sourceColor:'var(--amber2)' },
          { title:'Raising Girls: What Dads Get Wrong (And Right)', link:'#', pubDate:'Apr 18', thumbnail:null, description:'The relationship between a father and his daughter shapes how she sees herself for the rest of her life. No pressure.', source:'Parents', sourceColor:'var(--purple2)' },
          { title:'Dad Jokes Are Actually Good for Your Kids. Here\'s Why.', link:'#', pubDate:'Apr 17', thumbnail:null, description:'Groaning is a love language. Science — sort of — agrees.', source:'The Dad', sourceColor:'var(--teal2)' },
          { title:'The Case for Taking Your Kids on Solo Trips', link:'#', pubDate:'Apr 16', thumbnail:null, description:'One parent, one kid, one destination. The math is simple. The memories are not.', source:'Fatherly', sourceColor:'var(--teal2)' },
          { title:'How Dads Can Model Emotional Intelligence Every Single Day', link:'#', pubDate:'Apr 15', thumbnail:null, description:'It starts with naming your own feelings out loud — which is harder than it sounds.', source:'NYT Parenting', sourceColor:'var(--amber2)' },
          { title:'The Best Gear for Camping With Kids Under 8', link:'#', pubDate:'Apr 14', thumbnail:null, description:'Tested on real trails with real kids who complain about everything. Here\'s what survived.', source:'Parents', sourceColor:'var(--purple2)' },
          { title:'Why "Just Wait Until Your Father Gets Home" Did So Much Damage', link:'#', pubDate:'Apr 13', thumbnail:null, description:'The disciplinarian dad trope hurt everyone. A new generation is choosing differently.', source:'The Dad', sourceColor:'var(--teal2)' },
        ]);
      }
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  const scroll = (dir) => {
    if (rowRef.current) rowRef.current.scrollLeft += dir * 340;
  };

  const sources = ['All', ...RSS_SOURCES.map(s => s.name)];
  const filtered = active === 'All' ? items : items.filter(i => i.source === active);

  return (
    <section style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '70px 0 60px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <SectionHead label="Around the Web" title="Fatherhood in the News" sub="Stories from across the internet, curated for dads." />
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap' }}>
            {sources.map(s => (
              <button key={s} onClick={() => setActive(s)} style={{
                background: active === s ? 'var(--bg3)' : 'none',
                border: `1px solid ${active === s ? 'var(--border)' : 'transparent'}`,
                color: active === s ? 'var(--text)' : 'var(--muted)',
                padding: '5px 14px', borderRadius: 20,
                fontSize: 12, fontWeight: active === s ? 600 : 400,
                cursor: 'pointer', transition: 'all 0.15s',
              }}>{s}</button>
            ))}
          </div>
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div style={{ display: 'flex', gap: 20, overflow: 'hidden' }}>
            {[1,2,3,4,5].map(n => (
              <div key={n} style={{
                minWidth: 300, background: 'var(--bg2)', borderRadius: 8,
                border: '1px solid var(--border)', overflow: 'hidden', flexShrink: 0,
              }}>
                <div style={{ height: 160, background: 'var(--bg3)', animation: 'pulse 1.4s ease-in-out infinite' }} />
                <div style={{ padding: 16 }}>
                  {[80, 95, 60].map((w, i) => (
                    <div key={i} style={{
                      height: 12, width: `${w}%`, background: 'var(--bg3)',
                      borderRadius: 4, marginBottom: 10,
                      animation: 'pulse 1.4s ease-in-out infinite',
                      animationDelay: `${i * 0.15}s`,
                    }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--muted)', fontSize: 15 }}>
            Unable to load news feeds right now. <span style={{ color: 'var(--teal2)', cursor: 'pointer' }} onClick={() => window.location.reload()}>Try refreshing →</span>
          </div>
        )}

        {/* Feed cards */}
        {!loading && !error && (
          <div style={{ position: 'relative' }}>
            {/* Scroll arrows */}
            {[-1, 1].map(dir => (
              <button key={dir} onClick={() => scroll(dir)} style={{
                position: 'absolute', top: '50%', transform: 'translateY(-50%)',
                [dir === -1 ? 'left' : 'right']: -18,
                zIndex: 10, width: 36, height: 36, borderRadius: '50%',
                background: 'var(--bg3)', border: '1px solid var(--border)',
                color: 'var(--text)', fontSize: 16, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg4)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--bg3)'}>
                {dir === -1 ? '‹' : '›'}
              </button>
            ))}

            <div ref={rowRef} style={{
              display: 'flex', gap: 20,
              overflowX: 'auto', scrollBehavior: 'smooth',
              paddingBottom: 12,
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}>
              {filtered.map((item, i) => (
                <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" style={{
                  minWidth: 300, maxWidth: 300, flexShrink: 0,
                  background: 'var(--bg2)', borderRadius: 8,
                  border: '1px solid var(--border)', overflow: 'hidden',
                  display: 'flex', flexDirection: 'column',
                  textDecoration: 'none', color: 'inherit',
                  transition: 'transform 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'var(--bg4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'var(--border)'; }}>
                  {/* Thumbnail */}
                  <div style={{
                    height: 160, overflow: 'hidden', background: 'var(--bg3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {item.thumbnail
                      ? <img src={item.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
                      : <span style={{ fontSize: 28, opacity: 0.25 }}>🧭</span>
                    }
                  </div>
                  {/* Content */}
                  <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: item.sourceColor }}>
                        {item.source}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--subtle)' }}>{item.pubDate}</span>
                    </div>
                    <h4 style={{
                      fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 600,
                      lineHeight: 1.4, color: 'var(--text)', marginBottom: 8,
                      flex: 1,
                    }}>{item.title}</h4>
                    <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.description}</p>
                    <div style={{ marginTop: 12, fontSize: 12, color: 'var(--teal2)', fontWeight: 500 }}>Read on {item.source} →</div>
                  </div>
                </a>
              ))}
              {!filtered.length && !loading && (
                <div style={{ color: 'var(--muted)', fontSize: 15, padding: '40px 0' }}>No articles found for this source.</div>
              )}
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </section>
  );
};

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
const HomePage = ({ setPage }) => {
  return (
    <div className="fade-in">
      {/* HERO */}
      <section style={{
        position: 'relative', height: '92vh', minHeight: 600,
        display: 'flex', alignItems: 'flex-end',
        overflow: 'hidden',
      }}>
        <img
          src="https://picsum.photos/seed/mountain-dad/1600/900"
          alt="hero"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(12,13,20,1) 0%, rgba(12,13,20,0.6) 50%, rgba(12,13,20,0.1) 100%)',
        }} />
        {/* Compass watermark */}
        <div style={{
          position: 'absolute', top: 80, right: 60, opacity: 0.04,
          width: 400, height: 400,
        }}>
          <img src={'images/logo.png'} alt="" style={{ width: '100%', filter: 'invert(1)' }} />
        </div>

        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 40px 80px', width: '100%' }}>
          <div className="label label-accent" style={{ marginBottom: 16 }}>Featured Story</div>
          <h1 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(36px, 5.5vw, 72px)',
            fontWeight: 900, lineHeight: 1.1,
            maxWidth: 780,
            marginBottom: 20,
            textWrap: 'balance',
          }}>
            The First Trail: Why I Became<br/>a Hiking Dad at 38
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 18, maxWidth: 520, marginBottom: 30, lineHeight: 1.7 }}>
            I never hiked before she was born. Now the mountains feel like home. Here's how becoming a father led me to find myself outdoors.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <button style={{
              background: 'linear-gradient(135deg, var(--purple), var(--teal))',
              border: 'none', color: 'white',
              padding: '13px 28px', borderRadius: 6,
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
              letterSpacing: '0.02em',
            }}>Read the Story →</button>
            <span style={{ color: 'var(--muted)', fontSize: 13 }}>By Marcus Webb · 7 min read</span>
          </div>
        </div>
      </section>

      {/* THIN GRADIENT BAR */}
      <div style={{
        height: 3,
        background: 'linear-gradient(90deg, var(--purple), var(--teal), var(--amber))',
      }} />

      {/* LATEST STORIES */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40 }}>
          <SectionHead label="Latest Stories" title="From the Field" sub="Real stories from real dads, navigating it all." />
          <button onClick={() => setPage('Stories')} style={{
            background: 'none', border: '1px solid var(--border)',
            color: 'var(--muted)', padding: '8px 18px',
            borderRadius: 6, fontSize: 13, cursor: 'pointer',
            whiteSpace: 'nowrap', marginBottom: 40,
          }}>All Stories →</button>
        </div>
        <div className="grid-3">
          {STORIES.slice(0,3).map(s => <StoryCard key={s.id} story={s} setPage={setPage} />)}
        </div>
      </section>

      {/* TRAVEL CALLOUT */}
      <section style={{ position: 'relative', overflow: 'hidden', margin: '0 0 0 0' }}>
        <img
          src="https://picsum.photos/seed/olympic/1600/600"
          alt="travel"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(12,13,20,0.95) 40%, rgba(12,13,20,0.2) 100%)',
        }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '100px 40px' }}>
          <div className="label label-amber" style={{ marginBottom: 14 }}>Travel</div>
          <h2 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4vw, 52px)',
            fontWeight: 800, maxWidth: 540, lineHeight: 1.15, marginBottom: 16,
          }}>
            Olympic Peninsula With Kids: The Complete Dad's Guide
          </h2>
          <p style={{ color: 'var(--muted)', maxWidth: 440, fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
            Rainforests, tide pools, elk meadows — and a 5-year-old who hiked 8 miles without complaint. Here's the route.
          </p>
          <button onClick={() => setPage('Travel')} style={{
            background: 'none', border: '1px solid oklch(72% 0.14 66 / 0.6)',
            color: 'var(--amber2)', padding: '11px 24px',
            borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>Explore Destinations →</button>
        </div>
      </section>

      {/* GEAR PREVIEW */}
      <section style={{ background: 'var(--bg2)', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40 }}>
            <SectionHead label="Dad Gear" title="Gear We Actually Use" sub="Honest picks from dads who've tested them in the wild." />
            <button onClick={() => setPage('Gear')} style={{
              background: 'none', border: '1px solid var(--border)',
              color: 'var(--muted)', padding: '8px 18px',
              borderRadius: 6, fontSize: 13, cursor: 'pointer',
              whiteSpace: 'nowrap', marginBottom: 40,
            }}>All Gear →</button>
          </div>
          <div className="grid-4">
            {GEAR.slice(0,4).map(g => (
              <div key={g.id} style={{
                background: 'var(--bg3)', borderRadius: 8,
                overflow: 'hidden', border: '1px solid var(--border)',
                cursor: 'pointer', transition: 'transform 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = ''}>
                <div style={{ height: 170, overflow: 'hidden' }}>
                  <img src={g.img} alt={g.title} style={{ height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
                </div>
                <div style={{ padding: '16px 16px 14px' }}>
                  <div className="label" style={{ marginBottom: 6 }}>{g.cat}</div>
                  <h4 style={{ fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 600, marginBottom: 6, lineHeight: 1.3 }}>{g.title}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Stars n={g.rating} />
                    <span style={{ color: 'var(--amber2)', fontWeight: 600, fontSize: 14 }}>{g.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST FROM THE BLOG */}
      <section style={{ background:'var(--bg)', borderTop:'1px solid var(--border)', padding:'72px 0 60px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 40px' }}>
          <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:36 }}>
            <div>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--subtle)', marginBottom:8 }}>From the Blog</div>
              <h2 style={{ fontFamily:'var(--serif)', fontSize:32, fontWeight:700, color:'var(--text)' }}>Latest Essays</h2>
            </div>
            <button onClick={() => setPage('Blog')} style={{ background:'none', border:'1px solid rgba(255,255,255,0.12)', color:'var(--muted)', padding:'9px 20px', borderRadius:6, fontSize:13, fontWeight:600, cursor:'pointer' }}>
              All Essays →
            </button>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
            {BLOG_POSTS.slice(0,3).map(post => (
              <div key={post.id} onClick={() => setPage('Blog')} style={{ background:'#17181e', borderRadius:10, overflow:'hidden', border:'1px solid rgba(255,255,255,0.07)', cursor:'pointer', transition:'transform 0.2s, border-color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.borderColor='rgba(155,80,200,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; }}>
                <div style={{ height:180, overflow:'hidden', position:'relative' }}>
                  <img src={resolveImg(post.img)} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:LOGO_GRADIENT }} />
                  {post.credit && <span style={{ position:'absolute', bottom:8, right:8, fontSize:9, color:'rgba(255,255,255,0.7)', textShadow:'0 1px 3px rgba(0,0,0,0.8)' }}>© Paul Marshall</span>}
                </div>
                <div style={{ padding:'18px' }}>
                  <div style={{ marginBottom:8 }}>{post.tags.slice(0,2).map(t => <TagPill key={t} tag={t} />)}</div>
                  <h3 style={{ fontFamily:'var(--serif)', fontSize:16, fontWeight:700, lineHeight:1.35, color:'var(--text)', marginBottom:8 }}>{post.title}</h3>
                  <p style={{ color:'var(--muted)', fontSize:13, lineHeight:1.6 }}>{post.excerpt.slice(0,100)}…</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={{
        background: 'linear-gradient(135deg, oklch(18% 0.05 285), oklch(18% 0.04 192))',
        padding: '80px 40px',
        textAlign: 'center',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <CompassLogo size={48} />
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 700, margin: '20px 0 14px', lineHeight: 1.2 }}>
            Navigate Fatherhood With Us
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
            Stories, gear picks, and trip reports — straight to your inbox every Thursday morning.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <input
              placeholder="your@email.com"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid var(--border)',
                color: 'var(--text)', fontSize: 15,
                padding: '12px 18px', borderRadius: 6,
                width: 280, outline: 'none',
                fontFamily: 'var(--sans)',
              }}
            />
            <button style={{
              background: 'linear-gradient(135deg, var(--purple), var(--teal))',
              border: 'none', color: 'white',
              padding: '12px 22px', borderRadius: 6,
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}>Join →</button>
          </div>
          <p style={{ fontSize: 12, color: 'var(--subtle)', marginTop: 14 }}>No spam. Unsubscribe whenever. We respect your inbox.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '40px 40px 30px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <CompassLogo size={32} />
            <span style={{ fontFamily: 'var(--serif)', fontWeight: 700, color: 'var(--muted)' }}>
              <span style={{ color: 'var(--amber)' }}>Dad</span>venture
            </span>
          </div>
          <div style={{ display: 'flex', gap: 28 }}>
            {['About','Stories','Blog','Gear','Travel'].map(n => (
              <span key={n} style={{ fontSize: 13, color: 'var(--subtle)', cursor: 'pointer' }}>{n}</span>
            ))}
          </div>
          <span style={{ fontSize: 12, color: 'var(--subtle)' }}>© 2026 Dadventure. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

// ── ABOUT PAGE ───────────────────────────────────────────────────────────────
const AboutPage = () => {
  const values = [
    { word: 'Adventure', color: 'var(--amber2)',  bg: 'oklch(72% 0.14 66 / 0.08)',  desc: 'Fatherhood is not a task to complete. It is a terrain to explore — every day a new trail, every child a new compass heading.' },
    { word: 'Strength',  color: 'var(--purple2)', bg: 'oklch(52% 0.19 285 / 0.08)', desc: "Not the strength that intimidates. The quiet kind — showing up when it's hard, holding steady when things shift." },
    { word: 'Gentleness',color: 'var(--teal2)',   bg: 'oklch(57% 0.14 192 / 0.08)', desc: 'The softest moments leave the deepest marks. A gentle father teaches his kids that care is a form of courage.' },
    { word: 'Inclusion', color: 'var(--amber2)',  bg: 'oklch(72% 0.14 66 / 0.08)',  desc: "Every kind of dad belongs here. We are shaped by different paths and we're all walking the same essential journey." },
    { word: 'Wisdom',    color: 'var(--purple2)', bg: 'oklch(52% 0.19 285 / 0.08)', desc: 'Not knowing everything — knowing what matters. Wisdom is passed through the way we live, not the advice we give.' },
  ];

  const newsletterItems = [
    { icon: '😄', label: 'Dad Joke',                color: 'var(--amber2)',  desc: 'Because levity is a superpower.' },
    { icon: '❤️', label: 'Something From the Heart', color: 'var(--purple2)', desc: 'A story, a piece of news, an allegory worth sitting with.' },
    { icon: '⭐', label: 'Build Confidence',         color: 'var(--teal2)',   desc: 'A question to carry into the week.' },
    { icon: '🧭', label: 'Weekly Dadventure',        color: 'var(--amber2)',  desc: 'One actionable thing to do with your kids.' },
  ];

  return (
    <div className="fade-in">

      {/* HERO — VISION */}
      <div style={{
        background: 'linear-gradient(160deg, oklch(17% 0.04 285) 0%, oklch(14% 0.03 192) 100%)',
        padding: '140px 40px 90px',
        textAlign: 'center',
        borderBottom: '1px solid var(--border)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -80, right: -80, opacity: 0.03, width: 500, height: 500 }}>
          <img src={'images/logo.png'} alt="" style={{ width: '100%', filter: 'invert(1)' }} />
        </div>
        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative' }}>
          <CompassLogo size={64} />
          <div className="label label-accent" style={{ marginTop: 24, marginBottom: 16 }}>Our Vision</div>
          <h1 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 4.5vw, 62px)',
            fontWeight: 900, lineHeight: 1.15, marginBottom: 24,
          }}>
            A world where dads navigate fatherhood<br/>
            <em style={{ color: 'var(--amber2)' }}>like explorers.</em>
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.85, maxWidth: 640, margin: '0 auto' }}>
            Guided by their North Star. Grounded in purpose. Present for the journey.
          </p>
        </div>
      </div>

      {/* MISSION */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '80px 40px 70px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: 48, alignItems: 'start' }}>
          <div>
            <div className="label label-accent" style={{ marginBottom: 12 }}>Mission</div>
            <div style={{ width: 3, height: 60, background: 'linear-gradient(to bottom, var(--teal), transparent)', marginTop: 12 }} />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 700, lineHeight: 1.3, marginBottom: 0 }}>
              To help and inspire dads to see fatherhood as a journey — and live it through a shared sense of adventure.
            </h2>
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'var(--border)', maxWidth: 860, margin: '0 auto' }} />

      {/* PHILOSOPHY */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '70px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: 48, alignItems: 'start' }}>
          <div>
            <div className="label label-purple" style={{ marginBottom: 12 }}>Philosophy</div>
            <div style={{ width: 3, height: 60, background: 'linear-gradient(to bottom, var(--purple), transparent)', marginTop: 12 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <blockquote style={{
              fontFamily: 'var(--serif)', fontSize: 22, fontStyle: 'italic',
              fontWeight: 600, lineHeight: 1.55, color: 'var(--text)',
              borderLeft: '3px solid var(--purple2)', paddingLeft: 24, margin: 0,
            }}>
              Fatherhood is an energy and a journey. It is not a destination or a label.
            </blockquote>
            <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.85 }}>
              There is no point where one arrives and gets it right. A good father is shaped over time, by the way he shows up on ordinary days — tapping into protection, guidance, and care for others.
            </p>
            <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.85 }}>
              A father does not need to know everything. He needs to know what matters and share it through a way of life.
            </p>
            <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.85 }}>
              Dadventure exists to remind fathers to keep walking, to notice where they are, and to choose the next right step — because fatherhood is formed through the journey and the adventure that goes with it.
            </p>
            <div style={{
              background: 'linear-gradient(135deg, oklch(18% 0.04 285), oklch(16% 0.03 192))',
              border: '1px solid oklch(52% 0.19 285 / 0.25)',
              borderRadius: 10, padding: '24px 28px', marginTop: 4,
            }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 17, lineHeight: 1.7, color: 'var(--text)', marginBottom: 12 }}>
                Dadventure is not advice. It is not overly curated content whose sole purpose is to be consumed.
              </p>
              <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.75 }}>
                Dadventure is a guiding philosophy that is practiced. It is not asking <em>"how do I do this right?"</em> but{' '}
                <strong style={{ color: 'var(--purple2)' }}>"what kind of dad am I becoming?"</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HISTORY */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '70px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: 48, alignItems: 'start' }}>
          <div>
            <div className="label label-amber" style={{ marginBottom: 12 }}>History</div>
            <div style={{ width: 3, height: 60, background: 'linear-gradient(to bottom, var(--amber), transparent)', marginTop: 12 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px,3vw,34px)', fontWeight: 700, lineHeight: 1.25, marginBottom: 4 }}>
              The History of Dadventure
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.85 }}>
              Dadventure was born out of fear and pain. I was going through a divorce — it was the night I was packing up the last of my things. My kids were young and while the divorce was amicable and the right decision for both of us, it was very painful and strange.
            </p>
            <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.85 }}>
              The next morning I would be moving into a new apartment. The house we were in would be empty and the two of us would begin our separate and new lives. The connection would still remain through our two daughters. The moment I thought of them, the tears flooded from my face in an uncontrollable sob. How would this impact them? My time would immediately be cut in half. Half of their lives would now be spent without me.
            </p>
            <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.85 }}>
              After the wave of emotion passed, I knew I needed to reframe my thinking — because the negative, sorrowful and worrisome mindset wouldn't serve me nor them. Divorce is akin to death, but it's the death of a relationship. And the relationship with them was not dead. If anything, my relationship with them was just beginning. It was a new opportunity and a new adventure.
            </p>
            <div style={{ background: 'linear-gradient(135deg, oklch(18% 0.06 66), oklch(16% 0.03 66))', border: '1px solid oklch(72% 0.14 66 / 0.2)', borderRadius: 10, padding: '24px 28px' }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 19, lineHeight: 1.7, color: 'var(--text)', marginBottom: 0, fontStyle: 'italic' }}>
                "A light bulb went off and I wrote down the word. <strong style={{ color: 'var(--amber2)', fontStyle: 'normal' }}>Dadventure.</strong>"
              </p>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.85 }}>
              It was my new philosophy. It was my compass. I knew that fatherhood was my number one focus in all of this. My children were my anchors and my number one priority. How would I be the best dad I could be to my daughters? By treating every moment like an adventure. That's what this is. <strong style={{ color: 'var(--text)' }}>The adventures in fatherhood.</strong>
            </p>
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'var(--border)', maxWidth: 860, margin: '0 auto' }} />

      {/* VALUES */}
      <section style={{ padding: '70px 40px', background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionHead label="Values" title="What we stand for." sub="Five words. A whole way of living." center />
          <div style={{ display: 'flex', gap: 16, marginTop: 48, flexWrap: 'wrap', justifyContent: 'center' }}>
            {values.map(v => (
              <div key={v.word} style={{
                background: v.bg, border: `1px solid ${v.color}44`,
                borderRadius: 10, padding: '28px 24px',
                textAlign: 'center', flex: '1 1 180px', maxWidth: 210,
              }}>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 800, color: v.color, marginBottom: 12 }}>{v.word}</h3>
                <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PURPOSE + PROMISE */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          <div style={{ padding: '40px', background: 'var(--bg2)', borderRadius: 10, border: '1px solid var(--border)' }}>
            <div className="label label-accent" style={{ marginBottom: 14 }}>Purpose</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 700, lineHeight: 1.3, marginBottom: 18 }}>
              What problems do we solve?
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>
              Dadventure exists to help dads navigate fatherhood by giving them direction, confidence, and ideas — so they can show up intentionally and as their best selves.
            </p>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Bring your kids.', 'Show your kids.', 'Teach your kids.'].map(line => (
                <div key={line} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ color: 'var(--teal2)', fontWeight: 700, fontSize: 16 }}>→</span>
                  <span style={{ fontFamily: 'var(--serif)', fontSize: 17, fontWeight: 600, color: 'var(--text)' }}>{line}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: '40px', background: 'linear-gradient(135deg, oklch(18% 0.05 285), oklch(16% 0.04 192))', borderRadius: 10, border: '1px solid oklch(52% 0.19 285 / 0.25)' }}>
            <div className="label label-purple" style={{ marginBottom: 14 }}>Promise</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 700, lineHeight: 1.3, marginBottom: 20 }}>
              How do we solve it?
            </h2>
            {[
              { head: 'Give direction.',    body: 'The compass exists so you always know which way to go next.' },
              { head: 'Build confidence.', body: 'We help dads trust themselves — confidence grows through practice, not perfection.' },
              { head: 'Inspire ideas.',    body: 'Dadventure succeeds when more dads grow from consumer to contributor.' },
            ].map(({ head, body }) => (
              <div key={head} style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--purple2)', marginBottom: 4 }}>{head}</div>
                <div style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7 }}>{body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER FORMAT */}
      <section style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '70px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <SectionHead label="Every Thursday" title="What's in the newsletter." sub="Four things. Every week. No filler." center />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginTop: 48 }}>
            {newsletterItems.map(item => (
              <div key={item.label} style={{
                background: 'var(--bg3)', border: '1px solid var(--border)',
                borderRadius: 8, padding: '28px 20px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 700, color: item.color, marginBottom: 10 }}>{item.label}</h3>
                <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '80px 40px', textAlign: 'center' }}>
        <div className="label label-amber" style={{ marginBottom: 14 }}>Who We Serve</div>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 38, fontWeight: 800, lineHeight: 1.2, marginBottom: 20 }}>
          Dads. All of them.
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 17, lineHeight: 1.85, maxWidth: 580, margin: '0 auto 36px' }}>
          Dads who are struggling. Dads who are thriving. Dads who are hungry for more. Dads who are curious for new.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          {['New dads', 'Veteran dads', 'Single dads', 'Step-dads', 'Granddads', 'Dads-to-be', 'Dads in progress'].map(label => (
            <span key={label} style={{
              background: 'oklch(72% 0.14 66 / 0.1)', border: '1px solid oklch(72% 0.14 66 / 0.25)',
              color: 'var(--amber2)', fontSize: 13, fontWeight: 500, padding: '6px 16px', borderRadius: 20,
            }}>{label}</span>
          ))}
        </div>
      </section>

    </div>
  );
};

// ── STORIES PAGE ──────────────────────────────────────────────────────────────
// ── COMMISSIONED STORIES DATA ────────────────────────────────────────────────
const COMMISSIONED = [
  {
    id: 'c1',
    type: 'Dadventure Original',
    title: 'The New American Father: How a Generation of Dads Is Rewriting the Rules',
    excerpt: 'From boardrooms to playgrounds, men across the country are choosing presence over prestige — and reshaping what it means to raise a family in 2025.',
    author: 'James Whitfield',
    authorTitle: 'Contributing Writer',
    date: 'Apr 22, 2026',
    img: 'https://picsum.photos/seed/commissioned-dad1/1200/600',
    featured: true,
  },
  {
    id: 'c2',
    type: 'Thought Leadership',
    title: 'Why Vulnerability Is the Most Underrated Parenting Tool',
    excerpt: 'A child psychologist makes the case for dads who cry, admit mistakes, and say "I don\'t know" — and why it builds stronger kids.',
    author: 'Dr. Marcus Rivera',
    authorTitle: 'Child Psychologist',
    date: 'Apr 18, 2026',
    img: 'https://picsum.photos/seed/commissioned-dad2/800/500',
    featured: false,
  },
  {
    id: 'c3',
    type: 'Sponsored',
    title: 'The Outdoor Gear That Changed How We Camp as a Family',
    excerpt: 'Three seasons, two kids, one obsession. Here\'s the kit that made us fall in love with sleeping under the stars.',
    author: 'Tom Erikson',
    authorTitle: 'Outdoor Dad + Dadventure Partner',
    date: 'Apr 15, 2026',
    img: 'https://picsum.photos/seed/commissioned-dad3/800/500',
    featured: false,
  },
];

const COMMUNITY_VOICES = [
  { id: 'v1', title: 'I Coached My Daughter\'s Soccer Team for Three Years. Here\'s What She Taught Me.', author: 'Derek Okafor', location: 'Atlanta, GA', date: 'Apr 20, 2026', excerpt: 'I thought I was there to teach her how to play. Turns out she was there to teach me how to lose.' },
  { id: 'v2', title: 'What My Dad Never Said — And Why I Say It Every Day', author: 'Carlos Mendez', location: 'Denver, CO', date: 'Apr 17, 2026', excerpt: '"I love you." Three words he couldn\'t say. Three words I say ten times a day. The chain stops here.' },
  { id: 'v3', title: 'Raising a Kid With Autism Made Me a Better Human', author: 'Brian Cho', location: 'Seattle, WA', date: 'Apr 12, 2026', excerpt: 'My son doesn\'t experience the world the way I do. Learning to see through his eyes changed everything about mine.' },
  { id: 'v4', title: 'The Day I Chose My Kids Over My Career — And Never Looked Back', author: 'Nate Sullivan', location: 'Chicago, IL', date: 'Apr 8, 2026', excerpt: 'The promotion would have changed my life. Turning it down changed it more.' },
  { id: 'v5', title: 'Single Dad at 32: What the First Year Actually Looked Like', author: 'Jordan Ellis', location: 'Austin, TX', date: 'Apr 3, 2026', excerpt: 'Nobody prepares you. There\'s no class, no manual, no blueprint. Just you, a toddler, and a mountain of laundry.' },
  { id: 'v6', title: 'My Son Asked Me Why I Was Sad. I Told Him the Truth.', author: 'Marcus Webb', location: 'Portland, OR', date: 'Mar 29, 2026', excerpt: 'He was six. I was going through a hard stretch. The conversation that followed was the most honest I\'ve ever had.' },
];

const StoriesPage = () => {
  const [submitOpen, setSubmitOpen] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [pitch, setPitch] = React.useState('');

  return (
    <div className="fade-in">
      {/* HERO */}
      <div style={{ background:'#17181e', padding:'140px 40px 80px', borderBottom:'1px solid rgba(255,255,255,0.06)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(56,184,176,0.08) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ maxWidth:1280, margin:'0 auto', position:'relative' }}>
          <div style={{ height:2, width:60, background:LOGO_GRADIENT, borderRadius:2, marginBottom:24 }} />
          <h1 style={{ fontFamily:'var(--serif)', fontWeight:900, fontSize:'clamp(38px,5vw,68px)', lineHeight:1.05, marginBottom:20 }}>
            News &amp; <span style={{ background:LOGO_GRADIENT, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Stories</span>
          </h1>
          <p style={{ color:'oklch(68% 0.01 255)', fontSize:17, lineHeight:1.8, maxWidth:560, marginBottom:32 }}>
            Commissioned journalism, thought leadership and community voices — plus the best of what the fatherhood world is writing about right now.
          </p>
          <button onClick={() => setSubmitOpen(true)} style={{ background:LOGO_GRADIENT, border:'none', color:'white', padding:'12px 28px', borderRadius:7, fontSize:13, fontWeight:700, cursor:'pointer', letterSpacing:'0.02em' }}>
            Submit Your Story →
          </button>
        </div>
      </div>

      <div style={{ maxWidth:1280, margin:'0 auto', padding:'72px 40px 100px' }}>

        {/* TIER 1: COMMISSIONED */}
        <div style={{ marginBottom:80 }}>
          <div style={{ display:'flex', alignItems:'baseline', gap:16, marginBottom:40 }}>
            <h2 style={{ fontFamily:'var(--serif)', fontSize:28, fontWeight:700, color:'var(--text)' }}>Dadventure Originals</h2>
            <span style={{ fontSize:12, color:'var(--subtle)', letterSpacing:'0.08em', textTransform:'uppercase' }}>Commissioned &amp; Sponsored</span>
          </div>

          {/* Featured commissioned piece */}
          <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:0, background:'#17181e', borderRadius:12, overflow:'hidden', border:'1px solid rgba(255,255,255,0.07)', marginBottom:24, cursor:'pointer', transition:'border-color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor='rgba(56,184,176,0.35)'}
            onMouseLeave={e => e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'}>
            <div style={{ position:'relative', minHeight:340, overflow:'hidden' }}>
              <img src={COMMISSIONED[0].img} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(10,11,16,0) 60%, rgba(23,24,30,0.95) 100%)' }} />
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:LOGO_GRADIENT }} />
            </div>
            <div style={{ padding:'40px 36px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'#5AD4CE', marginBottom:14, display:'block' }}>{COMMISSIONED[0].type}</span>
              <h3 style={{ fontFamily:'var(--serif)', fontSize:24, fontWeight:700, lineHeight:1.25, color:'var(--text)', marginBottom:14 }}>{COMMISSIONED[0].title}</h3>
              <p style={{ color:'var(--muted)', fontSize:14, lineHeight:1.75, marginBottom:20 }}>{COMMISSIONED[0].excerpt}</p>
              <div style={{ fontSize:12, color:'var(--subtle)' }}>{COMMISSIONED[0].author} · {COMMISSIONED[0].authorTitle} · {COMMISSIONED[0].date}</div>
            </div>
          </div>

          {/* Two smaller commissioned pieces */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
            {COMMISSIONED.slice(1).map(c => (
              <div key={c.id} style={{ background:'#17181e', borderRadius:10, border:'1px solid rgba(255,255,255,0.07)', overflow:'hidden', cursor:'pointer', transition:'border-color 0.2s, transform 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(56,184,176,0.35)'; e.currentTarget.style.transform='translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.transform=''; }}>
                <div style={{ height:200, overflow:'hidden', position:'relative' }}>
                  <img src={c.img} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:LOGO_GRADIENT }} />
                  <span style={{ position:'absolute', top:12, left:12, fontSize:10, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', background:'rgba(0,0,0,0.6)', backdropFilter:'blur(8px)', color:'#5AD4CE', padding:'4px 10px', borderRadius:4 }}>{c.type}</span>
                </div>
                <div style={{ padding:'22px' }}>
                  <h3 style={{ fontFamily:'var(--serif)', fontSize:18, fontWeight:700, lineHeight:1.3, color:'var(--text)', marginBottom:10 }}>{c.title}</h3>
                  <p style={{ color:'var(--muted)', fontSize:13, lineHeight:1.65, marginBottom:14 }}>{c.excerpt}</p>
                  <div style={{ fontSize:11, color:'var(--subtle)' }}>{c.author} · {c.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TIER 2: COMMUNITY VOICES */}
        <div style={{ marginBottom:80 }}>
          <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:40, flexWrap:'wrap', gap:12 }}>
            <div>
              <h2 style={{ fontFamily:'var(--serif)', fontSize:28, fontWeight:700, color:'var(--text)', marginBottom:4 }}>Community Voices</h2>
              <p style={{ color:'var(--subtle)', fontSize:13 }}>Real dads. Real stories. Submitted, edited and published.</p>
            </div>
            <button onClick={() => setSubmitOpen(true)} style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', color:'var(--muted)', padding:'9px 20px', borderRadius:6, fontSize:13, fontWeight:600, cursor:'pointer' }}>
              Submit Your Story
            </button>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
            {COMMUNITY_VOICES.map(v => (
              <div key={v.id} style={{ background:'#17181e', borderRadius:10, border:'1px solid rgba(255,255,255,0.07)', padding:'24px', cursor:'pointer', transition:'border-color 0.2s, transform 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(155,80,200,0.35)'; e.currentTarget.style.transform='translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.transform=''; }}>
                <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:14 }}>
                  <div style={{ width:36, height:36, borderRadius:'50%', background:LOGO_GRADIENT, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, color:'white', flexShrink:0 }}>{v.author.split(' ').map(w=>w[0]).join('')}</div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>{v.author}</div>
                    <div style={{ fontSize:11, color:'var(--subtle)' }}>{v.location}</div>
                  </div>
                </div>
                <h3 style={{ fontFamily:'var(--serif)', fontSize:16, fontWeight:700, lineHeight:1.35, color:'var(--text)', marginBottom:10 }}>{v.title}</h3>
                <p style={{ color:'var(--muted)', fontSize:13, lineHeight:1.65, marginBottom:14 }}>{v.excerpt}</p>
                <div style={{ fontSize:11, color:'var(--subtle)' }}>{v.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TIER 3: RSS FEED */}
        <RssFeedSection />

      </div>

      {/* SUBMIT MODAL */}
      {submitOpen && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', backdropFilter:'blur(8px)', zIndex:500, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
          <div style={{ background:'#17181e', borderRadius:14, border:'1px solid rgba(255,255,255,0.1)', padding:'48px 44px', maxWidth:520, width:'100%', position:'relative' }}>
            <button onClick={() => setSubmitOpen(false)} style={{ position:'absolute', top:16, right:20, background:'none', border:'none', color:'var(--subtle)', fontSize:22, cursor:'pointer' }}>×</button>
            {submitted ? (
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:40, marginBottom:16 }}>✍️</div>
                <h3 style={{ fontFamily:'var(--serif)', fontSize:26, fontWeight:700, marginBottom:12 }}>We got it — thank you!</h3>
                <p style={{ color:'var(--muted)', fontSize:15, lineHeight:1.7 }}>We read every submission. If your story is a fit, we'll be in touch within 2 weeks.</p>
              </div>
            ) : (
              <div>
                <div style={{ height:2, width:48, background:LOGO_GRADIENT, borderRadius:2, marginBottom:24 }} />
                <h3 style={{ fontFamily:'var(--serif)', fontSize:26, fontWeight:700, marginBottom:10 }}>Tell Your Story</h3>
                <p style={{ color:'var(--muted)', fontSize:14, lineHeight:1.7, marginBottom:28 }}>Every dad has a story worth telling. Submit a pitch or a draft and we'll take it from there.</p>
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  <input type="text" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:7, padding:'12px 16px', color:'var(--text)', fontSize:14, fontFamily:'var(--sans)', outline:'none' }} />
                  <input type="email" placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:7, padding:'12px 16px', color:'var(--text)', fontSize:14, fontFamily:'var(--sans)', outline:'none' }} />
                  <textarea placeholder="Tell us about your story idea — the topic, your angle, and why dads need to read it. 2-3 sentences is plenty." value={pitch} onChange={e=>setPitch(e.target.value)} rows={4} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:7, padding:'12px 16px', color:'var(--text)', fontSize:14, fontFamily:'var(--sans)', outline:'none', resize:'vertical' }} />
                  <button onClick={() => { if (name && pitch) setSubmitted(true); }} style={{ background:LOGO_GRADIENT, border:'none', color:'white', padding:'13px', borderRadius:7, fontSize:14, fontWeight:700, cursor:'pointer' }}>Submit Pitch →</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ── BLOG PAGE ─────────────────────────────────────────────────────────────────

// ── PAYWALL HELPERS ───────────────────────────────────────────────────────────
const getReadCount = () => parseInt(localStorage.getItem('dv_read_count') || '0');
const incReadCount = () => localStorage.setItem('dv_read_count', getReadCount() + 1);
const isEmailSub  = () => localStorage.getItem('dv_email_sub') === 'true';
const isPaidSub   = () => localStorage.getItem('dv_paid_sub')  === 'true';
const setEmailSub = () => localStorage.setItem('dv_email_sub', 'true');

// Email wall — shown after article 1 if not subscribed
const EmailWall = ({ onUnlock }) => {
  const [email, setEmail] = React.useState('');
  const [done, setDone] = React.useState(false);
  const submit = () => {
    if (!email.includes('@')) return;
    setEmailSub();
    setDone(true);
    setTimeout(onUnlock, 1200);
  };
  return (
    <div style={{ position:'relative', marginTop: -60 }}>
      {/* Fade blur over last paragraph */}
      <div style={{ height:120, background:'linear-gradient(to bottom, transparent, var(--bg))', marginBottom:0 }} />
      <div style={{ background:'#17181e', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, padding:'48px 40px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(155,80,200,0.08) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'relative' }}>
          <div style={{ height:2, width:60, background:LOGO_GRADIENT, borderRadius:2, margin:'0 auto 24px' }} />
          <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(22px,3vw,32px)', fontWeight:900, marginBottom:12, color:'var(--text)' }}>
            Enjoying the read?
          </h2>
          <p style={{ color:'var(--muted)', fontSize:16, lineHeight:1.75, maxWidth:460, margin:'0 auto 32px' }}>
            Subscribe free and unlock <strong style={{ color:'var(--text)' }}>2 more essays</strong> — no credit card needed. Just good writing in your inbox.
          </p>
          {done ? (
            <div style={{ color:'#3DCCA0', fontSize:16, fontWeight:600 }}>✓ You're in! Loading your next read...</div>
          ) : (
            <div style={{ display:'flex', gap:10, maxWidth:420, margin:'0 auto' }}>
              <input
                type="email" placeholder="your@email.com" value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && submit()}
                style={{ flex:1, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:6, padding:'12px 16px', color:'var(--text)', fontSize:14, outline:'none', fontFamily:'var(--sans)' }}
              />
              <button onClick={submit} style={{ background:LOGO_GRADIENT, border:'none', color:'white', padding:'12px 24px', borderRadius:6, fontSize:14, fontWeight:700, cursor:'pointer', whiteSpace:'nowrap' }}>
                Get Free Access
              </button>
            </div>
          )}
          <p style={{ color:'var(--subtle)', fontSize:12, marginTop:16 }}>No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
};

// Paid wall — shown after 3 free articles
const PaidWall = ({ onBack }) => (
  <div style={{ position:'relative', marginTop:-60 }}>
    <div style={{ height:120, background:'linear-gradient(to bottom, transparent, var(--bg))' }} />
    <div style={{ background:'#17181e', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, padding:'48px 40px', textAlign:'center', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,104,48,0.08) 0%, transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'relative' }}>
        <div style={{ height:2, width:60, background:LOGO_GRADIENT, borderRadius:2, margin:'0 auto 24px' }} />
        <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(22px,3vw,32px)', fontWeight:900, marginBottom:12, color:'var(--text)' }}>
          You've read your free articles
        </h2>
        <p style={{ color:'var(--muted)', fontSize:16, lineHeight:1.75, maxWidth:480, margin:'0 auto 40px' }}>
          Support Dadventure and get unlimited access to all essays — plus everything below.
        </p>
        {/* Benefits */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, maxWidth:520, margin:'0 auto 40px', textAlign:'left' }}>
          {[
            ['📬','Weekly Newsletter','Fresh essays every week'],
            ['🏕️','Dad Community','Connect with dads like you'],
            ['⚡','Early Access','Read new essays first'],
            ['🍳','Special Recipes','Food for the whole family'],
            ['🎽','Merch & Gear Discounts','Exclusive member pricing'],
            ['✨','And more...','New perks added regularly'],
          ].map(([icon, title, sub]) => (
            <div key={title} style={{ background:'rgba(255,255,255,0.04)', borderRadius:8, padding:'14px 16px', display:'flex', gap:12, alignItems:'flex-start' }}>
              <span style={{ fontSize:20 }}>{icon}</span>
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:'var(--text)', marginBottom:2 }}>{title}</div>
                <div style={{ fontSize:12, color:'var(--subtle)' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Pricing */}
        <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap', marginBottom:24 }}>
          <button onClick={() => { localStorage.setItem('dv_paid_sub','true'); window.location.reload(); }} style={{ background:LOGO_GRADIENT, border:'none', color:'white', padding:'16px 32px', borderRadius:8, fontSize:15, fontWeight:700, cursor:'pointer' }}>
            Join for $5 / month
          </button>
          <button onClick={() => { localStorage.setItem('dv_paid_sub','true'); window.location.reload(); }} style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.15)', color:'var(--text)', padding:'16px 32px', borderRadius:8, fontSize:15, fontWeight:600, cursor:'pointer' }}>
            $40 / year <span style={{ fontSize:12, color:'var(--subtle)', display:'block' }}>Save 33%</span>
          </button>
        </div>
        <button onClick={onBack} style={{ background:'none', border:'none', color:'var(--subtle)', fontSize:13, cursor:'pointer', textDecoration:'underline' }}>
          ← Back to free articles
        </button>
      </div>
    </div>
  </div>
);

const ArticleView = ({ post, onBack }) => {
  const [readCount] = React.useState(() => {
    const c = getReadCount() + 1;
    localStorage.setItem('dv_read_count', c);
    return c;
  });
  const [emailUnlocked, setEmailUnlocked] = React.useState(isEmailSub);

  const paid = isPaidSub();
  const showEmailWall = !paid && !emailUnlocked && readCount > 1;
  const showPaidWall  = !paid && (emailUnlocked || isEmailSub()) && readCount > 3;

  const bodies = window.ARTICLE_BODIES || {};
  const body = bodies[post.id];
  // If paywalled, only show first few paragraphs
  const visibleBody = (showEmailWall || showPaidWall) && body
    ? body.slice(0, Math.ceil(body.length * 0.35))
    : body;

  return (
  <div className="fade-in" style={{ minHeight:'100vh', background:'var(--bg)' }}>
    {/* Hero image */}
    <div style={{ position:'relative', height:'clamp(300px,45vh,520px)', overflow:'hidden' }}>
      <img src={resolveImg(post.img)} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(10,11,16,0.95) 0%, rgba(10,11,16,0.3) 60%, transparent 100%)' }} />
      {post.credit && <span style={{ position:'absolute', bottom:16, right:16, fontSize:10, color:'rgba(255,255,255,0.7)', textShadow:'0 1px 4px rgba(0,0,0,0.9)' }}>© Paul Marshall</span>}
      <button onClick={onBack} style={{ position:'absolute', top:88, left:40, background:'rgba(0,0,0,0.45)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.15)', color:'var(--text)', padding:'8px 16px', borderRadius:6, fontSize:13, fontWeight:500, cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}>
        ← Back to Blog
      </button>
      <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'40px 40px 48px', maxWidth:900 }}>
        <div style={{ marginBottom:14 }}>{post.tags.map(t => <TagPill key={t} tag={t} />)}</div>
        <h1 style={{ fontFamily:'var(--serif)', fontSize:'clamp(28px,4vw,52px)', fontWeight:900, lineHeight:1.1, color:'white', marginBottom:0 }}>{post.title}</h1>
      </div>
    </div>

    {/* Article body */}
    <div style={{ maxWidth:740, margin:'0 auto', padding:'56px 40px 100px' }}>
      {/* Byline */}
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:48, paddingBottom:32, borderBottom:'1px solid var(--border)' }}>
        <div style={{ width:40, height:40, borderRadius:'50%', background:LOGO_GRADIENT, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:700, color:'white', flexShrink:0 }}>{post.author.split(' ').map(w=>w[0]).join('')}</div>
        <div>
          <div style={{ fontSize:14, fontWeight:600, color:'var(--text)' }}>{post.author}</div>
          <div style={{ fontSize:12, color:'var(--subtle)' }}>{post.date}</div>
        </div>
        <div style={{ marginLeft:'auto', height:2, width:60, background:LOGO_GRADIENT, borderRadius:2 }} />
      </div>

      {/* Content */}
      {!body && (
        <p style={{ fontFamily:'var(--serif)', fontSize:'clamp(18px,2vw,22px)', lineHeight:1.8, color:'oklch(88% 0.008 255)', marginBottom:40, fontStyle:'italic' }}>{post.excerpt}</p>
      )}

      {visibleBody && (
        <div>
          {visibleBody.map((para, i) => (
            <p key={i} style={{
              fontSize: post.tags.includes('Poetry') ? 'clamp(17px,1.8vw,21px)' : 'clamp(16px,1.5vw,19px)',
              lineHeight: post.tags.includes('Poetry') ? 2.1 : 1.85,
              color:'oklch(85% 0.008 255)',
              marginBottom: post.tags.includes('Poetry') ? 32 : 28,
              fontFamily: post.tags.includes('Poetry') ? 'var(--serif)' : (i === 0 ? 'var(--serif)' : 'var(--sans)'),
              fontStyle: post.tags.includes('Poetry') ? 'italic' : 'normal',
              whiteSpace: post.tags.includes('Poetry') ? 'pre-line' : 'normal',
            }}>{para}</p>
          ))}
        </div>
      )}

      {/* Walls */}
      {showEmailWall && <EmailWall onUnlock={() => setEmailUnlocked(true)} />}
      {showPaidWall  && <PaidWall onBack={onBack} />}

      {/* No wall — show back button */}
      {!showEmailWall && !showPaidWall && (
        <button onClick={onBack} style={{ marginTop:48, background:'none', border:'1px solid var(--border)', color:'var(--muted)', padding:'10px 20px', borderRadius:6, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}>
          ← Back to all essays
        </button>
      )}
    </div>
  </div>
  );
};

const BlogPage = () => {
  const [activeCat, setActiveCat] = React.useState('All');
  const [selectedPost, setSelectedPost] = React.useState(null);
  const filtered = activeCat === 'All' ? BLOG_POSTS : BLOG_POSTS.filter(p => p.tags.includes(activeCat));
  const featured = filtered[0];
  const rest = filtered.slice(1);
  if (selectedPost) return <ArticleView post={selectedPost} onBack={() => setSelectedPost(null)} />;
  return (
  <div className="fade-in">
    {/* Hero */}
    <div style={{ background:'#17181e', padding:'140px 40px 70px', borderBottom:'1px solid rgba(255,255,255,0.06)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 55% at 50% 0%, rgba(155,80,200,0.12) 0%, transparent 70%)', pointerEvents:'none' }} />
      <div style={{ maxWidth:1280, margin:'0 auto', position:'relative' }}>
        <div style={{ fontFamily:'var(--sans)', fontSize:11, fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:20, background:LOGO_GRADIENT, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', display:'inline-block' }}>The Blog</div>
        <h1 style={{ fontFamily:'var(--serif)', fontWeight:900, lineHeight:1.05, fontSize:'clamp(42px, 5vw, 72px)', marginBottom:20, background:LOGO_GRADIENT, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', display:'block' }}>Essays &amp; Observations</h1>
        <p style={{ color:'oklch(68% 0.01 255)', fontSize:17, maxWidth:580, lineHeight:1.85, marginBottom:36 }}>
          Welcome to a piece of my mind — where I hope we both find peace of mind.<br /><br />
          Not everything here is about fatherhood. But everything is influenced by it. It's the central lens through which I see the world. And yet I'm more than a dad — and the fullest parts of who I am are what make me a better one.<br /><br />
          These essays touch the same constellation of things: religion, spirituality, philosophy. Those bleed into psychedelics, health and mindset. Those are shaped by culture, travel, food and music. It's all connected.<br /><br />
          It's all one big Dadventure. I hope you find yours.
        </p>
        {/* Category filters */}
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {BLOG_CATS.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)} style={{
              background: activeCat === cat ? LOGO_GRADIENT : 'rgba(255,255,255,0.06)',
              border: activeCat === cat ? 'none' : '1px solid rgba(255,255,255,0.1)',
              color: activeCat === cat ? 'white' : 'var(--muted)',
              padding:'7px 18px', borderRadius:20, fontSize:12, fontWeight:600,
              letterSpacing:'0.04em', cursor:'pointer', transition:'all 0.2s',
            }}>{cat}</button>
          ))}
        </div>
        <div style={{ marginTop:28, height:2, width:80, background:LOGO_GRADIENT, borderRadius:2 }} />
      </div>
    </div>

    <div style={{ maxWidth:1280, margin:'0 auto', padding:'60px 40px' }}>
      {/* Featured */}
      {featured && (
        <article onClick={() => setSelectedPost(featured)} style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:0, background:'#17181e', borderRadius:10, overflow:'hidden', border:'1px solid rgba(255,255,255,0.07)', marginBottom:60, cursor:'pointer', transition:'border-color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.borderColor='rgba(155,80,200,0.4)'}
          onMouseLeave={e => e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'}>
          <div style={{ position:'relative', minHeight:380, overflow:'hidden' }}>
            <img src={resolveImg(featured.img)} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:LOGO_GRADIENT }} />
            {featured.credit && <span style={{ position:'absolute', bottom:12, right:12, fontSize:10, fontWeight:500, color:'rgba(255,255,255,0.8)', textShadow:'0 1px 4px rgba(0,0,0,0.9)', letterSpacing:'0.04em' }}>© Paul Marshall</span>}
          </div>
          <div style={{ padding:'48px 44px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
            <div style={{ marginBottom:14 }}>{featured.tags.map(t => <TagPill key={t} tag={t} />)}</div>
            <h2 style={{ fontFamily:'var(--serif)', fontSize:28, fontWeight:700, lineHeight:1.25, margin:'0 0 14px', color:'var(--text)' }}>{featured.title}</h2>
            <p style={{ color:'var(--muted)', fontSize:15, lineHeight:1.75, marginBottom:24 }}>{featured.excerpt}</p>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24 }}>
              <div style={{ width:32, height:32, borderRadius:'50%', background:LOGO_GRADIENT, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:'white' }}>{featured.author.split(' ').map(w=>w[0]).join('')}</div>
              <span style={{ fontSize:13, color:'var(--muted)' }}>{featured.author}</span>
              <span style={{ fontSize:13, color:'var(--subtle)', marginLeft:'auto' }}>{featured.date}</span>
            </div>
            <button onClick={e => { e.stopPropagation(); setSelectedPost(featured); }} style={{ alignSelf:'flex-start', background:LOGO_GRADIENT, border:'none', color:'white', padding:'11px 22px', borderRadius:6, fontSize:13, fontWeight:700, cursor:'pointer', letterSpacing:'0.02em' }}>Read Essay →</button>
          </div>
        </article>
      )}

      {/* Count */}
      <div style={{ display:'flex', alignItems:'baseline', gap:12, marginBottom:32 }}>
        <span style={{ fontFamily:'var(--serif)', fontSize:22, fontWeight:700, color:'var(--text)' }}>{activeCat === 'All' ? 'All Essays' : activeCat}</span>
        <span style={{ fontSize:13, color:'var(--subtle)' }}>{filtered.length} {filtered.length === 1 ? 'essay' : 'essays'}</span>
      </div>

      {/* Grid */}
      <div className="grid-3">
        {rest.map(post => (
          <article key={post.id} onClick={() => setSelectedPost(post)} style={{ background:'#17181e', borderRadius:8, overflow:'hidden', border:'1px solid rgba(255,255,255,0.07)', cursor:'pointer', transition:'transform 0.2s, border-color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.borderColor='rgba(155,80,200,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; }}>
            <div style={{ height:200, overflow:'hidden', position:'relative' }}>
              <img src={resolveImg(post.img)} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:LOGO_GRADIENT }} />
              {post.credit && <span style={{ position:'absolute', bottom:8, right:8, fontSize:9, fontWeight:500, color:'rgba(255,255,255,0.75)', textShadow:'0 1px 3px rgba(0,0,0,0.8)', letterSpacing:'0.04em' }}>© Paul Marshall</span>}
            </div>
            <div style={{ padding:'20px' }}>
              <div style={{ marginBottom:10 }}>{post.tags.map(t => <TagPill key={t} tag={t} />)}</div>
              <h3 style={{ fontFamily:'var(--serif)', fontSize:18, fontWeight:600, lineHeight:1.3, margin:'0 0 10px', color:'var(--text)' }}>{post.title}</h3>
              <p style={{ color:'var(--muted)', fontSize:14, lineHeight:1.6, marginBottom:14 }}>{post.excerpt}</p>
              <span style={{ fontSize:12, color:'var(--subtle)' }}>{post.date}</span>
            </div>
          </article>
        ))}
      </div>
      {filtered.length === 0 && <p style={{ color:'var(--subtle)', textAlign:'center', padding:'60px 0' }}>No essays in this category yet.</p>}
    </div>
  </div>
  );
};

// ── RESOURCES PAGE ───────────────────────────────────────────────────────────
const ResourcesPage = ({ setPage }) => {
  const [submitted, setSubmitted] = React.useState(false);
  const [request, setRequest] = React.useState('');

  const resources = [
    {
      page: 'Gear',
      icon: '🎒',
      label: 'Gear Reviews',
      desc: 'Honest, field-tested picks from dads who actually use them. No PR samples, no affiliate pressure — just the real stuff that makes adventures with kids better.',
      tags: ['Outdoor', 'Tech', 'Home', 'On-the-Go'],
      cta: 'Browse Gear',
    },
    {
      page: 'Travel',
      icon: '🗺️',
      label: 'Travel Guides',
      desc: 'Destination guides written from the dad perspective. Where to go, how to pack, what to skip, and why your kids will remember it forever.',
      tags: ['Family Trips', 'Solo Travel', 'Road Trips', 'International'],
      cta: 'Explore Destinations',
    },
    {
      page: 'Social',
      icon: '🤝',
      label: 'Dad Community',
      desc: 'A place to connect with other dads navigating the same adventure. Share stories, find support, ask questions and be reminded you\'re not alone in this.',
      tags: ['Support', 'Stories', 'Connection', 'Advice'],
      cta: 'Join the Community',
    },
    {
      page: 'DadDinner',
      icon: '🍳',
      label: 'Dad Does Dinner',
      desc: 'Simple, delicious recipes designed for dads cooking with (or for) their kids. From weeknight staples to weekend showstoppers — food that brings everyone to the table.',
      tags: ['Quick Meals', 'Kid-Friendly', 'Weekend Cooking', 'Grill'],
      cta: 'Get Cooking',
    },
    {
      page: 'DadAdventures',
      icon: '⚡',
      label: '1-Hour Dadventures',
      desc: 'You don\'t need a weekend to make a memory. These are quick, local, low-cost adventures designed to fit into a Tuesday afternoon — and blow your kid\'s mind anyway.',
      tags: ['Local Exploring', 'Free Activities', 'All Ages', 'Outdoors'],
      cta: 'Find an Adventure',
    },
    {
      page: 'GetInvolved',
      icon: '🌱',
      label: 'Get Involved',
      desc: 'From volunteering to mentorship to showing up for your community — ways dads can make a difference beyond their own front door.',
      tags: ['Volunteer', 'Mentorship', 'Community', 'Give Back'],
      cta: 'Get Involved',
    },
  ];

  const coming = [
    { icon: '📚', label: 'Book Club', desc: 'Reads worth your time' },
    { icon: '🧠', label: 'Mental Health', desc: 'Resources for the inner work' },
    { icon: '💪', label: 'Health & Fitness', desc: 'Staying strong for your kids' },
    { icon: '💰', label: 'Finance for Dads', desc: 'Building the future together' },
    { icon: '🍳', label: 'Recipes', desc: 'Food worth making with kids' },
    { icon: '🎵', label: 'Music & Culture', desc: 'What to listen to and why' },
  ];

  return (
    <div className="fade-in">
      {/* Hero */}
      <div style={{ background:'#17181e', padding:'140px 40px 80px', borderBottom:'1px solid rgba(255,255,255,0.06)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(91,107,212,0.1) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ maxWidth:860, margin:'0 auto', position:'relative' }}>
          <div style={{ height:2, width:60, background:LOGO_GRADIENT, borderRadius:2, marginBottom:24 }} />
          <h1 style={{ fontFamily:'var(--serif)', fontWeight:900, fontSize:'clamp(38px,5vw,68px)', lineHeight:1.05, marginBottom:24 }}>
            Built for Dads.<br />
            <span style={{ background:LOGO_GRADIENT, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>By a Dad.</span>
          </h1>
          <p style={{ color:'oklch(68% 0.01 255)', fontSize:18, lineHeight:1.8, maxWidth:600, marginBottom:0 }}>
            This section exists because fatherhood doesn't come with a manual. It comes with questions, chaos, joy and an occasional desperate Google search at midnight. We're building a library of real resources — tested, curated and written from the trenches — so dads of all kinds have a place to turn.
          </p>
        </div>
      </div>

      <div style={{ maxWidth:1160, margin:'0 auto', padding:'72px 40px 100px' }}>

        {/* Main resource cards */}
        <div style={{ marginBottom:72 }}>
          <div style={{ marginBottom:40 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--subtle)', marginBottom:10 }}>What's here now</div>
            <h2 style={{ fontFamily:'var(--serif)', fontSize:32, fontWeight:700, color:'var(--text)' }}>Explore the Resource Library</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
            {resources.map(r => (
              <div key={r.page} style={{ background:'#17181e', borderRadius:12, border:'1px solid rgba(255,255,255,0.07)', overflow:'hidden', display:'flex', flexDirection:'column', transition:'border-color 0.2s, transform 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(155,80,200,0.35)'; e.currentTarget.style.transform='translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.transform=''; }}>
                {/* Color bar */}
                <div style={{ height:3, background:LOGO_GRADIENT }} />
                <div style={{ padding:'32px 28px', flex:1, display:'flex', flexDirection:'column' }}>
                  <div style={{ fontSize:36, marginBottom:16 }}>{r.icon}</div>
                  <h3 style={{ fontFamily:'var(--serif)', fontSize:22, fontWeight:700, color:'var(--text)', marginBottom:12 }}>{r.label}</h3>
                  <p style={{ color:'var(--muted)', fontSize:14, lineHeight:1.75, marginBottom:20, flex:1 }}>{r.desc}</p>
                  {/* Tags */}
                  <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:24 }}>
                    {r.tags.map(t => (
                      <span key={t} style={{ fontSize:10, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', background:'rgba(255,255,255,0.06)', color:'var(--subtle)', padding:'3px 8px', borderRadius:3 }}>{t}</span>
                    ))}
                  </div>
                  <button onClick={() => setPage(r.page)} style={{ background:LOGO_GRADIENT, border:'none', color:'white', padding:'11px 20px', borderRadius:7, fontSize:13, fontWeight:700, cursor:'pointer', letterSpacing:'0.02em', alignSelf:'flex-start' }}>
                    {r.cta} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coming soon */}
        <div style={{ marginBottom:72 }}>
          <div style={{ marginBottom:32 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--subtle)', marginBottom:10 }}>On the horizon</div>
            <h2 style={{ fontFamily:'var(--serif)', fontSize:28, fontWeight:700, color:'var(--text)' }}>What We're Building Next</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
            {coming.map(c => (
              <div key={c.label} style={{ background:'rgba(255,255,255,0.03)', border:'1px dashed rgba(255,255,255,0.08)', borderRadius:10, padding:'20px 22px', display:'flex', gap:14, alignItems:'flex-start' }}>
                <span style={{ fontSize:24, flexShrink:0 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize:14, fontWeight:600, color:'var(--text)', marginBottom:3 }}>{c.label}</div>
                  <div style={{ fontSize:12, color:'var(--subtle)' }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Request form */}
        <div style={{ background:'linear-gradient(135deg, rgba(91,107,212,0.08) 0%, rgba(56,184,176,0.08) 100%)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:'52px 48px', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(155,80,200,0.06) 0%, transparent 70%)', pointerEvents:'none' }} />
          <div style={{ position:'relative' }}>
            <div style={{ height:2, width:60, background:LOGO_GRADIENT, borderRadius:2, margin:'0 auto 24px' }} />
            <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(22px,3vw,34px)', fontWeight:900, marginBottom:14, color:'var(--text)' }}>
              Don't see what you're looking for?
            </h2>
            <p style={{ color:'var(--muted)', fontSize:16, lineHeight:1.8, maxWidth:520, margin:'0 auto 36px' }}>
              Let us know what resources would make your life as a dad easier. We're building this for dads of all kinds — single dads, new dads, stepdads, girl dads, sports dads, adventure dads. Tell us what you need.
            </p>
            {submitted ? (
              <div style={{ background:'rgba(61,204,160,0.12)', border:'1px solid rgba(61,204,160,0.3)', borderRadius:10, padding:'20px 32px', display:'inline-block' }}>
                <div style={{ color:'#3DCCA0', fontSize:16, fontWeight:700, marginBottom:4 }}>✓ Got it — thank you!</div>
                <div style={{ color:'var(--muted)', fontSize:13 }}>We read every request and use them to build what comes next.</div>
              </div>
            ) : (
              <div style={{ maxWidth:560, margin:'0 auto', display:'flex', flexDirection:'column', gap:12 }}>
                <textarea
                  value={request}
                  onChange={e => setRequest(e.target.value)}
                  placeholder="What resource would help you most as a dad? (e.g. 'A guide to talking to my kids about mental health' or 'Book recommendations for new dads')"
                  rows={4}
                  style={{ width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:8, padding:'14px 16px', color:'var(--text)', fontSize:14, lineHeight:1.7, fontFamily:'var(--sans)', resize:'vertical', outline:'none', boxSizing:'border-box' }}
                />
                <button
                  onClick={() => { if (request.trim()) setSubmitted(true); }}
                  style={{ background:LOGO_GRADIENT, border:'none', color:'white', padding:'13px 28px', borderRadius:7, fontSize:14, fontWeight:700, cursor:'pointer', alignSelf:'center', letterSpacing:'0.02em' }}>
                  Send It Our Way →
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

// DAD DOES DINNER PAGE
const DadDinnerPage = () => {
  const recipes = [
    { title:'One-Pan Lemon Chicken & Rice', time:'35 min', serves:'4', difficulty:'Easy', tags:['Weeknight','Kid-Friendly'], desc:'A complete dinner in one pan. Crispy chicken thighs on a bed of lemony rice — minimal cleanup, maximum applause.' },
    { title:'Smash Burger Night', time:'20 min', serves:'4', difficulty:'Easy', tags:['Grill','Weekend'], desc:'Let the kids smash their own patties. Secret sauce, American cheese, brioche buns. The kind of dinner that becomes a Friday tradition.' },
    { title:'Dad\'s Pantry Pasta', time:'25 min', serves:'4', difficulty:'Easy', tags:['Weeknight','Quick'], desc:'Olive oil, garlic, parmesan, pasta water. The Italian secret weapon hiding in your pantry. No sauce required.' },
    { title:'Breakfast for Dinner Tacos', time:'15 min', serves:'4', difficulty:'Easy', tags:['Kid-Friendly','Quick'], desc:'Scrambled eggs, crispy bacon, cheese, salsa in a warm flour tortilla. Your kids will ask for this every week.' },
    { title:'Campfire Chili', time:'45 min', serves:'6', difficulty:'Medium', tags:['Weekend','Grill'], desc:'Deep, smoky, hearty. Make it Saturday, eat it Sunday. Better the next day. Serve with cornbread and a quiet house.' },
    { title:'Mango Salsa Fish Tacos', time:'30 min', serves:'4', difficulty:'Medium', tags:['Weekend','Fresh'], desc:'Grilled mahi-mahi, mango salsa, lime crema, cabbage slaw. The taco that makes you feel like you\'re on vacation.' },
  ];
  return (
    <div className="fade-in">
      <div style={{ background:'#17181e', padding:'140px 40px 80px', borderBottom:'1px solid rgba(255,255,255,0.06)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(232,104,48,0.08) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ maxWidth:860, margin:'0 auto', position:'relative' }}>
          <div style={{ height:2, width:60, background:LOGO_GRADIENT, borderRadius:2, marginBottom:24 }} />
          <h1 style={{ fontFamily:'var(--serif)', fontWeight:900, fontSize:'clamp(38px,5vw,64px)', lineHeight:1.05, marginBottom:20 }}>
            Dad Does <span style={{ background:LOGO_GRADIENT, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Dinner</span>
          </h1>
          <p style={{ color:'oklch(68% 0.01 255)', fontSize:17, lineHeight:1.8, maxWidth:560 }}>
            You don't need to be a chef. You need to show up, turn on the stove, and make something that brings everyone to the table. These recipes are built for dads — simple, delicious, and worth repeating.
          </p>
        </div>
      </div>
      <div style={{ maxWidth:1160, margin:'0 auto', padding:'64px 40px 100px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
          {recipes.map(r => (
            <div key={r.title} style={{ background:'#17181e', borderRadius:10, border:'1px solid rgba(255,255,255,0.07)', overflow:'hidden', transition:'transform 0.2s, border-color 0.2s', cursor:'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.borderColor='rgba(232,104,48,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; }}>
              <div style={{ height:3, background:LOGO_GRADIENT }} />
              <div style={{ padding:'24px' }}>
                <div style={{ display:'flex', gap:8, marginBottom:14, flexWrap:'wrap' }}>
                  {r.tags.map(t => <span key={t} style={{ fontSize:10, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', background:'rgba(232,104,48,0.12)', color:'#F0925A', padding:'3px 8px', borderRadius:3 }}>{t}</span>)}
                </div>
                <h3 style={{ fontFamily:'var(--serif)', fontSize:19, fontWeight:700, lineHeight:1.3, color:'var(--text)', marginBottom:10 }}>{r.title}</h3>
                <p style={{ color:'var(--muted)', fontSize:14, lineHeight:1.65, marginBottom:18 }}>{r.desc}</p>
                <div style={{ display:'flex', gap:16, fontSize:12, color:'var(--subtle)' }}>
                  <span>⏱ {r.time}</span>
                  <span>👥 Serves {r.serves}</span>
                  <span>📊 {r.difficulty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:64, background:'rgba(255,255,255,0.03)', border:'1px dashed rgba(255,255,255,0.08)', borderRadius:12, padding:'40px', textAlign:'center' }}>
          <h3 style={{ fontFamily:'var(--serif)', fontSize:24, fontWeight:700, marginBottom:12 }}>Got a recipe worth sharing?</h3>
          <p style={{ color:'var(--muted)', fontSize:15, lineHeight:1.7, maxWidth:440, margin:'0 auto 24px' }}>If you've got a go-to dinner that your kids actually eat, we want to hear about it. We're building this recipe library together.</p>
          <button style={{ background:LOGO_GRADIENT, border:'none', color:'white', padding:'12px 28px', borderRadius:7, fontSize:13, fontWeight:700, cursor:'pointer' }}>Submit a Recipe →</button>
        </div>
      </div>
    </div>
  );
};

// 1-HOUR DADVENTURES PAGE
const DadAdventuresPage = () => {
  const adventures = [
    { title:'Sunrise Hike Before School', duration:'45 min', age:'5+', cost:'Free', icon:'🌅', desc:'Set the alarm an hour early. Drive to the nearest trailhead. Watch the sun come up together. They\'ll talk about it all week.' },
    { title:'Backyard Astronomy Night', duration:'60 min', age:'4+', cost:'Free', icon:'🌌', desc:'Lay blankets in the backyard after dark. Bring a star map app. Find three constellations. Make hot chocolate. Done.' },
    { title:'Local Farmers Market Hunt', duration:'60 min', age:'All ages', cost:'$10–20', icon:'🥕', desc:'Give each kid $5 and let them pick one thing. Cook it together that night. Let them own the whole experience.' },
    { title:'Skipping Stones at the Creek', duration:'30 min', age:'3+', cost:'Free', icon:'💧', desc:'Find water. Find flat rocks. Teach them the flick. There\'s something ancient and perfect about this.' },
    { title:'Hardware Store Build Day', duration:'60 min', age:'5+', cost:'$15', icon:'🔨', desc:'Buy a simple wooden kit at Home Depot. Build something together. Hang it somewhere in the house. Let them sign it.' },
    { title:'The Mystery Drive', duration:'45 min', age:'All ages', cost:'Free', icon:'🚗', desc:'Get in the car. Let each kid say "left" or "right" at every turn. See where you end up. Get out and explore it.' },
  ];
  return (
    <div className="fade-in">
      <div style={{ background:'#17181e', padding:'140px 40px 80px', borderBottom:'1px solid rgba(255,255,255,0.06)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(56,184,176,0.08) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ maxWidth:860, margin:'0 auto', position:'relative' }}>
          <div style={{ height:2, width:60, background:LOGO_GRADIENT, borderRadius:2, marginBottom:24 }} />
          <h1 style={{ fontFamily:'var(--serif)', fontWeight:900, fontSize:'clamp(38px,5vw,64px)', lineHeight:1.05, marginBottom:20 }}>
            <span style={{ background:LOGO_GRADIENT, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>1-Hour</span> Dadventures
          </h1>
          <p style={{ color:'oklch(68% 0.01 255)', fontSize:17, lineHeight:1.8, maxWidth:580 }}>
            You don't need a vacation to make a memory. These are quick, local, low-cost adventures designed to fit into any Tuesday afternoon — and leave your kids talking for weeks.
          </p>
        </div>
      </div>
      <div style={{ maxWidth:1160, margin:'0 auto', padding:'64px 40px 100px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
          {adventures.map(a => (
            <div key={a.title} style={{ background:'#17181e', borderRadius:10, border:'1px solid rgba(255,255,255,0.07)', overflow:'hidden', transition:'transform 0.2s, border-color 0.2s', cursor:'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.borderColor='rgba(56,184,176,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; }}>
              <div style={{ height:3, background:LOGO_GRADIENT }} />
              <div style={{ padding:'28px 24px' }}>
                <div style={{ fontSize:36, marginBottom:14 }}>{a.icon}</div>
                <h3 style={{ fontFamily:'var(--serif)', fontSize:19, fontWeight:700, lineHeight:1.3, color:'var(--text)', marginBottom:10 }}>{a.title}</h3>
                <p style={{ color:'var(--muted)', fontSize:14, lineHeight:1.65, marginBottom:18 }}>{a.desc}</p>
                <div style={{ display:'flex', gap:14, fontSize:12, color:'var(--subtle)', flexWrap:'wrap' }}>
                  <span>⏱ {a.duration}</span>
                  <span>👶 Age {a.age}</span>
                  <span>💰 {a.cost}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:64, background:'rgba(255,255,255,0.03)', border:'1px dashed rgba(255,255,255,0.08)', borderRadius:12, padding:'40px', textAlign:'center' }}>
          <h3 style={{ fontFamily:'var(--serif)', fontSize:24, fontWeight:700, marginBottom:12 }}>What's your go-to 1-hour adventure?</h3>
          <p style={{ color:'var(--muted)', fontSize:15, lineHeight:1.7, maxWidth:440, margin:'0 auto 24px' }}>Every dad has that one thing they do with their kids that costs nothing and means everything. Share yours and we'll add it to the library.</p>
          <button style={{ background:LOGO_GRADIENT, border:'none', color:'white', padding:'12px 28px', borderRadius:7, fontSize:13, fontWeight:700, cursor:'pointer' }}>Share Your Dadventure →</button>
        </div>
      </div>
    </div>
  );
};

// GET INVOLVED PAGE
const GetInvolvedPage = () => {
  const ways = [
    { icon:'✍️', title:'Write for Dadventure', desc:'Have a story worth telling? An essay, a trip report, a recipe, a moment? We publish real dads writing real life. Pitch us.' },
    { icon:'📸', title:'Share Your Photography', desc:'Got shots from the road, the trail, the kitchen or the backyard? We\'re always looking for authentic imagery from dads who actually live this way.' },
    { icon:'🎙️', title:'Be on the Podcast', desc:'We\'re building out a conversation series with dads doing things differently. If you\'ve got a story worth telling, let\'s talk.' },
    { icon:'🧑‍🏫', title:'Mentor a New Dad', desc:'One of the most powerful things an experienced dad can do is show up for someone just starting out. We\'re building a mentorship network.' },
    { icon:'🤝', title:'Partner With Us', desc:'Brand, organization or community that serves dads and families? Let\'s build something together that actually helps people.' },
    { icon:'💬', title:'Join the Conversation', desc:'Follow along, share what resonates, leave a comment, start a thread. The most powerful thing you can do is show up consistently.' },
  ];
  return (
    <div className="fade-in">
      <div style={{ background:'#17181e', padding:'140px 40px 80px', borderBottom:'1px solid rgba(255,255,255,0.06)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(61,204,160,0.08) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ maxWidth:860, margin:'0 auto', position:'relative' }}>
          <div style={{ height:2, width:60, background:LOGO_GRADIENT, borderRadius:2, marginBottom:24 }} />
          <h1 style={{ fontFamily:'var(--serif)', fontWeight:900, fontSize:'clamp(38px,5vw,64px)', lineHeight:1.05, marginBottom:20 }}>
            Get <span style={{ background:LOGO_GRADIENT, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Involved</span>
          </h1>
          <p style={{ color:'oklch(68% 0.01 255)', fontSize:17, lineHeight:1.8, maxWidth:580 }}>
            Dadventure is bigger than one dad's story. It's a movement. There are a hundred ways to show up — for your kids, for other dads, for your community. Here are a few places to start.
          </p>
        </div>
      </div>
      <div style={{ maxWidth:1160, margin:'0 auto', padding:'64px 40px 100px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, marginBottom:64 }}>
          {ways.map(w => (
            <div key={w.title} style={{ background:'#17181e', borderRadius:10, border:'1px solid rgba(255,255,255,0.07)', padding:'28px 24px', transition:'transform 0.2s, border-color 0.2s', cursor:'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.borderColor='rgba(61,204,160,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; }}>
              <div style={{ fontSize:32, marginBottom:14 }}>{w.icon}</div>
              <h3 style={{ fontFamily:'var(--serif)', fontSize:18, fontWeight:700, color:'var(--text)', marginBottom:10 }}>{w.title}</h3>
              <p style={{ color:'var(--muted)', fontSize:14, lineHeight:1.7 }}>{w.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ background:'linear-gradient(135deg, rgba(61,204,160,0.08) 0%, rgba(91,107,212,0.08) 100%)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:'52px 48px', textAlign:'center' }}>
          <div style={{ height:2, width:60, background:LOGO_GRADIENT, borderRadius:2, margin:'0 auto 24px' }} />
          <h2 style={{ fontFamily:'var(--serif)', fontSize:32, fontWeight:900, marginBottom:14 }}>Ready to connect?</h2>
          <p style={{ color:'var(--muted)', fontSize:16, lineHeight:1.8, maxWidth:480, margin:'0 auto 32px' }}>Whether you want to write, collaborate, mentor or just say hello — we want to hear from you. Dadventure is built by dads, for dads.</p>
          <button style={{ background:LOGO_GRADIENT, border:'none', color:'white', padding:'14px 32px', borderRadius:7, fontSize:14, fontWeight:700, cursor:'pointer', letterSpacing:'0.02em' }}>Reach Out →</button>
        </div>
      </div>
    </div>
  );
};

// GEAR PAGE
const GearPage = () => {
  const [cat, setCat] = useState('All');
  const cats = ['All', 'Outdoor', 'Tech', 'Home', 'On-the-Go'];
  const filtered = cat === 'All' ? GEAR : GEAR.filter(g => g.cat === cat);

  return (
    <div className="fade-in">
      <div style={{
        background: 'linear-gradient(160deg, oklch(16% 0.04 68) 0%, var(--bg2) 60%)',
        padding: '140px 40px 60px', borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="label label-amber" style={{ marginBottom: 12 }}>Dad Gear</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 14 }}>
            Gear We Actually Use
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 17, maxWidth: 480, lineHeight: 1.7 }}>
            No affiliate nonsense. No PR samples we've never touched. Just honest picks from dads who've tested them in the field — with kids in tow.
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 32, flexWrap: 'wrap' }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{
                background: cat === c ? 'linear-gradient(135deg, var(--amber), oklch(60% 0.14 40))' : 'var(--bg3)',
                border: '1px solid ' + (cat === c ? 'transparent' : 'var(--border)'),
                color: cat === c ? '#0c0d14' : 'var(--muted)',
                padding: '7px 18px', borderRadius: 20,
                fontSize: 13, fontWeight: cat === c ? 700 : 400,
                cursor: 'pointer', transition: 'all 0.2s',
              }}>{c}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 40px' }}>
        <div className="grid-4">
          {filtered.map(g => (
            <article key={g.id} style={{
              background: 'var(--bg2)', borderRadius: 8, overflow: 'hidden',
              border: '1px solid var(--border)', cursor: 'pointer',
              transition: 'transform 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'var(--bg4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'var(--border)'; }}>
              <div style={{ height: 180, overflow: 'hidden' }}>
                <img src={g.img} alt={g.title} style={{ height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
              </div>
              <div style={{ padding: '18px 18px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span className="label">{g.cat}</span>
                  <span style={{ color: 'var(--amber2)', fontWeight: 700, fontSize: 15 }}>{g.price}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 600, lineHeight: 1.3, marginBottom: 8 }}>{g.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>{g.note}</p>
                <Stars n={g.rating} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── TRAVEL PAGE ───────────────────────────────────────────────────────────────
const TravelPage = () => (
  <div className="fade-in">
    {/* Hero Destination */}
    <div style={{ position: 'relative', height: '70vh', minHeight: 500, display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
      <img src={DESTINATIONS[0].img} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(12,13,20,1) 0%, rgba(12,13,20,0.5) 60%, transparent 100%)',
      }} />
      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 40px 72px', width: '100%' }}>
        <div className="label label-amber" style={{ marginBottom: 14 }}>{DESTINATIONS[0].region}</div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4vw, 54px)', fontWeight: 900, maxWidth: 700, lineHeight: 1.15, marginBottom: 16 }}>
          {DESTINATIONS[0].title}
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 17, maxWidth: 480, lineHeight: 1.7, marginBottom: 26 }}>{DESTINATIONS[0].sub}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{
            background: 'rgba(255,255,255,0.09)', border: '1px solid var(--border)',
            borderRadius: 6, padding: '8px 16px', fontSize: 13, color: 'var(--muted)',
          }}>⏱ {DESTINATIONS[0].duration}</div>
          <div style={{
            background: 'rgba(255,255,255,0.09)', border: '1px solid var(--border)',
            borderRadius: 6, padding: '8px 16px', fontSize: 13, color: 'var(--muted)',
          }}>👶 Ages {DESTINATIONS[0].age}</div>
          <button style={{
            background: 'linear-gradient(135deg, var(--teal), var(--purple))',
            border: 'none', color: 'white',
            padding: '11px 24px', borderRadius: 6,
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>Read the Guide →</button>
        </div>
      </div>
    </div>

    {/* More Destinations */}
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '70px 40px' }}>
      <SectionHead label="Destinations" title="Where Dads Go" sub="Field-tested itineraries, honest logistics, and the real story of what it's like to travel with kids." />
      <div className="grid-3">
        {DESTINATIONS.slice(1).map(d => (
          <article key={d.id} style={{
            background: 'var(--bg2)', borderRadius: 8, overflow: 'hidden',
            border: '1px solid var(--border)', cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
          onMouseLeave={e => e.currentTarget.style.transform = ''}>
            <div className="img-overlay" style={{ height: 240, overflow: 'hidden' }}>
              <img src={d.img} alt={d.title} style={{ height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute', top: 16, left: 16, zIndex: 1,
                background: 'rgba(12,13,20,0.72)', borderRadius: 4,
                padding: '4px 10px', fontSize: 11, fontWeight: 600,
                letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--amber2)',
              }}>{d.region}</div>
            </div>
            <div style={{ padding: '22px 22px 18px' }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 700, lineHeight: 1.3, marginBottom: 10 }}>{d.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{d.sub}</p>
              <div style={{ display: 'flex', gap: 10 }}>
                <span style={{
                  background: 'var(--bg3)', border: '1px solid var(--border)',
                  borderRadius: 4, padding: '4px 10px', fontSize: 12, color: 'var(--muted)',
                }}>⏱ {d.duration}</span>
                <span style={{
                  background: 'var(--bg3)', border: '1px solid var(--border)',
                  borderRadius: 4, padding: '4px 10px', fontSize: 12, color: 'var(--muted)',
                }}>Ages {d.age}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>

    {/* Trip Report CTA */}
    <section style={{
      background: 'linear-gradient(135deg, oklch(17% 0.04 192), oklch(14% 0.03 255))',
      padding: '70px 40px', textAlign: 'center',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: 580, margin: '0 auto' }}>
        <div className="label label-accent" style={{ marginBottom: 14 }}>Share Your Route</div>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>
          Taken a great trip with your kids?
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
          We publish trip reports from dads who've done the legwork — and want other dads to know exactly what to expect.
        </p>
        <button style={{
          background: 'linear-gradient(135deg, var(--teal), var(--purple))',
          border: 'none', color: 'white', padding: '13px 28px',
          borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: 'pointer',
        }}>Submit a Trip Report</button>
      </div>
    </section>
  </div>
);

// ── SOCIAL PAGE ───────────────────────────────────────────────────────────────
const SocialPage = () => {
  const [platform, setPlatform] = useState('YouTube');

  const platforms = [
    { id: 'YouTube',   color: '#FF0000', bg: 'oklch(45% 0.22 25)',  icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M23.5 6.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-.9C17.2 2.8 12 2.8 12 2.8s-5.2 0-8.3.2c-.5.1-1.5.1-2.3.9C.7 4.6.5 6.2.5 6.2S.3 8.1.3 10v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.5 1C5.2 19.1 12 19.1 12 19.1s5.2 0 8.3-.2c.5-.1 1.5-.1 2.3-.9.7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V10c0-1.9-.2-3.8-.2-3.8zM9.7 14.3V8.5l6.2 2.9-6.2 2.9z"/></svg>
    )},
    { id: 'TikTok',    color: '#010101', bg: 'oklch(22% 0.01 255)', icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M19.6 3.3C18.5 2 17.7 1 17.7 1h-3.4v15.2c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5c.3 0 .5 0 .8.1V10c-.3 0-.5-.1-.8-.1C8.2 9.9 5.5 12.6 5.5 16s2.7 6.1 6.1 6.1 6.1-2.7 6.1-6.1V8.5c1.1.7 2.4 1.1 3.8 1.1V6.2c-.7 0-1.9-.5-1.9-2.9z"/></svg>
    )},
    { id: 'Instagram', color: '#E1306C', bg: 'oklch(52% 0.19 0)',   icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.2 4.9 1.8 5.1 5.1.1 1.3.1 1.6.1 4.9s0 3.6-.1 4.9c-.2 3.3-1.8 4.9-5.1 5.1-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1C3.8 21.9 2.1 20.4 2 17c-.1-1.3-.1-1.6-.1-4.9s0-3.6.1-4.9C2.2 3.9 3.8 2.2 7.1 2.3c1.3-.1 1.6-.1 4.9-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9C.3 21.3 2.7 23.7 7.1 23.9 8.3 24 8.7 24 12 24s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9C23.7 2.7 21.4.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4A6.2 6.2 0 0012 5.8zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.8a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>
    )},
    { id: 'Facebook',  color: '#1877F2', bg: 'oklch(48% 0.17 255)', icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1C0 18.1 4.4 23.1 10.1 24v-8.4H7.1v-3.5h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2V7.8h-1.5c-1.5 0-1.9.9-1.9 1.9v2.2h3.3l-.5 3.5h-2.8V24C19.6 23.1 24 18.1 24 12.1z"/></svg>
    )},
  ];

  const YOUTUBE_VIDEOS = [
    { id:1, title:'First Camping Trip with a Toddler: What We Packed, What We Forgot', views:'142K', duration:'18:32', date:'3 days ago', img:'https://picsum.photos/seed/yt-camp/640/360' },
    { id:2, title:'The Dad Gear Review: Osprey Poco Plus vs. Deuter Kid Comfort', views:'89K', duration:'12:44', date:'1 week ago', img:'https://picsum.photos/seed/yt-gear/640/360' },
    { id:3, title:'Road Trip to Olympic Peninsula — Full Dad Vlog', views:'210K', duration:'24:08', date:'2 weeks ago', img:'https://picsum.photos/seed/yt-road/640/360' },
    { id:4, title:'How I Talk to My Kids About Hard Things', views:'316K', duration:'9:15', date:'3 weeks ago', img:'https://picsum.photos/seed/yt-talk/640/360' },
    { id:5, title:'5 Hikes in the Pacific Northwest That Kids Can Actually Do', views:'78K', duration:'15:20', date:'1 month ago', img:'https://picsum.photos/seed/yt-hike/640/360' },
    { id:6, title:'Dad Life in Japan: Tokyo & Kyoto With a 3-Year-Old', views:'422K', duration:'31:02', date:'1 month ago', img:'https://picsum.photos/seed/yt-japan/640/360' },
  ];

  const TIKTOK_POSTS = [
    { id:1, caption:'POV: You planned a "quick hike" with your 4-year-old 😅 #dadlife #hikingdad', likes:'84.2K', comments:'1.2K', shares:'3.4K', img:'https://picsum.photos/seed/tt-hike/400/700' },
    { id:2, caption:'The snack bag is the most important piece of gear you own #dadventure #toddler', likes:'62K', comments:'890', shares:'2.1K', img:'https://picsum.photos/seed/tt-snack/400/700' },
    { id:3, caption:'Teaching my son to build a fire ✌️ #camping #fatherhood', likes:'118K', comments:'2.4K', shares:'8.7K', img:'https://picsum.photos/seed/tt-fire/400/700' },
    { id:4, caption:'When your kid asks a question you have absolutely no answer to 😂 #dadhumor', likes:'201K', comments:'4.1K', shares:'22K', img:'https://picsum.photos/seed/tt-funny/400/700' },
    { id:5, caption:'Bedtime routine when you actually stick to it vs. when you don\'t #dadlife', likes:'95K', comments:'1.7K', shares:'9.2K', img:'https://picsum.photos/seed/tt-bed/400/700' },
    { id:6, caption:'Gear review: is the Yeti Kids worth it? Short answer: yes #gear #dadventure', likes:'44K', comments:'630', shares:'1.8K', img:'https://picsum.photos/seed/tt-yeti/400/700' },
  ];

  const INSTAGRAM_POSTS = [
    { id:1, img:'https://picsum.photos/seed/ig1/600/600', likes:'4.2K', caption:'Every trail is better with a tiny hiking buddy.' },
    { id:2, img:'https://picsum.photos/seed/ig2/600/600', likes:'6.8K', caption:'Sunrise at the summit. Worth the 4am start.' },
    { id:3, img:'https://picsum.photos/seed/ig3/600/600', likes:'3.1K', caption:"Campfire s'mores are non-negotiable." },
    { id:4, img:'https://picsum.photos/seed/ig4/600/600', likes:'9.4K', caption:'The look when they catch their first fish.' },
    { id:5, img:'https://picsum.photos/seed/ig5/600/600', likes:'5.5K', caption:'This is why we do it.' },
    { id:6, img:'https://picsum.photos/seed/ig6/600/600', likes:'7.1K', caption:'Tokyo with a toddler: 10/10 recommend.' },
    { id:7, img:'https://picsum.photos/seed/ig7/600/600', likes:'2.9K', caption:'Morning light, camp coffee, no agenda.' },
    { id:8, img:'https://picsum.photos/seed/ig8/600/600', likes:'11.2K', caption:"She hiked 6 miles today. I'm so proud I can't stand it." },
    { id:9, img:'https://picsum.photos/seed/ig9/600/600', likes:'3.7K', caption:'Gear that earns its place in the pack.' },
  ];

  const FB_POSTS = [
    { id:1, text: "Just posted our full Olympic Peninsula guide and the response has been incredible. So many of you are planning trips with your little ones — that means the world to us. Drop your questions in the comments and we'll answer every one.", likes:847, comments:93, shares:212, date:'April 21', img:'https://picsum.photos/seed/fb1/800/420' },
    { id:2, text: "Thursday dispatch is out 🧭 This week: what it actually feels like to drop your kid off for their first overnight without you. Marcus Webb wrote it and it absolutely wrecked us (in the best way). Link in bio.", likes:1204, comments:148, shares:390, date:'April 17', img: null },
    { id:3, text: "We asked: what's the one piece of gear you'd never leave home without when traveling with kids?\n\nTop answers:\n— Hatch Rest (sleep is non-negotiable)\n— Osprey Poco carrier\n— Yeti Kids bottle\n— A dedicated snack bag\n\nWhat's yours?", likes:563, comments:284, shares:67, date:'April 14', img:'https://picsum.photos/seed/fb3/800/420' },
    { id:4, text: "New contributor essay is up: 'I Stopped Apologizing for Leaving Work Early' by Marcus Webb. This one sparked some real conversations in our DMs. Read it, share it with another dad who needs it.", likes:2318, comments:211, shares:614, date:'April 10', img: null },
  ];

  const pData = platforms.find(p => p.id === platform);

  const PlayIcon = () => (
    <div style={{
      position: 'absolute', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 52, height: 52, borderRadius: '50%',
      background: 'rgba(0,0,0,0.65)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(4px)',
      border: '2px solid rgba(255,255,255,0.3)',
    }}>
      <svg width="18" height="18" viewBox="0 0 16 16" fill="white"><path d="M3 2l11 6-11 6z"/></svg>
    </div>
  );

  return (
    <div className="fade-in">
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(160deg, oklch(17% 0.04 255) 0%, var(--bg2) 70%)',
        padding: '130px 40px 0',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="label label-accent" style={{ marginBottom: 12 }}>Social</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 14 }}>
            Follow the Adventure
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 17, maxWidth: 520, lineHeight: 1.7, marginBottom: 36 }}>
            We're out here on every platform. Videos, reels, posts, and stories — all the stuff that doesn't fit in a newsletter.
          </p>

          {/* Follow buttons */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 36, flexWrap: 'wrap' }}>
            {platforms.map(p => (
              <a key={p.id} href="#" style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'var(--bg3)', border: '1px solid var(--border)',
                color: 'var(--text)', padding: '9px 18px', borderRadius: 6,
                fontSize: 13, fontWeight: 600, transition: 'border-color 0.2s',
                textDecoration: 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = p.color}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                <span style={{ color: p.color }}>{p.icon}</span>
                Follow on {p.id}
              </a>
            ))}
          </div>

          {/* Platform tabs */}
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border)' }}>
            {platforms.map(p => (
              <button key={p.id} onClick={() => setPlatform(p.id)} style={{
                background: 'none', border: 'none',
                display: 'flex', alignItems: 'center', gap: 8,
                color: platform === p.id ? 'var(--text)' : 'var(--muted)',
                padding: '12px 24px',
                fontSize: 14, fontWeight: platform === p.id ? 600 : 400,
                cursor: 'pointer', position: 'relative',
                borderBottom: platform === p.id ? `2px solid ${p.color}` : '2px solid transparent',
                marginBottom: -1,
                transition: 'color 0.2s',
              }}>
                <span style={{ color: platform === p.id ? p.color : 'var(--subtle)' }}>{p.icon}</span>
                {p.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '50px 40px 80px' }} className="fade-in" key={platform}>

        {/* ── YOUTUBE ── */}
        {platform === 'YouTube' && (
          <div>
            {/* Featured */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 28, marginBottom: 48,
              background: 'var(--bg2)', borderRadius: 10, overflow: 'hidden',
              border: '1px solid var(--border)',
            }}>
              <div style={{ position: 'relative', cursor: 'pointer', overflow: 'hidden' }}>
                <img src={YOUTUBE_VIDEOS[0].img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 320 }} />
                <PlayIcon />
                <div style={{
                  position: 'absolute', bottom: 12, right: 12,
                  background: 'rgba(0,0,0,0.8)', color: 'white',
                  fontSize: 12, fontWeight: 600, padding: '3px 8px', borderRadius: 3,
                }}>{YOUTUBE_VIDEOS[0].duration}</div>
              </div>
              <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="label" style={{ color: '#FF0000', marginBottom: 12 }}>Latest Video</div>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 700, lineHeight: 1.3, marginBottom: 14 }}>{YOUTUBE_VIDEOS[0].title}</h2>
                <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                  <span style={{ fontSize: 13, color: 'var(--muted)' }}>{YOUTUBE_VIDEOS[0].views} views</span>
                  <span style={{ fontSize: 13, color: 'var(--subtle)' }}>{YOUTUBE_VIDEOS[0].date}</span>
                </div>
                <button style={{
                  alignSelf: 'flex-start',
                  background: '#FF0000', border: 'none', color: 'white',
                  padding: '10px 20px', borderRadius: 6,
                  fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="white"><path d="M3 2l11 6-11 6z"/></svg>
                  Watch Now
                </button>
              </div>
            </div>
            {/* Grid */}
            <div className="grid-3">
              {YOUTUBE_VIDEOS.slice(1).map(v => (
                <article key={v.id} style={{
                  background: 'var(--bg2)', borderRadius: 8, overflow: 'hidden',
                  border: '1px solid var(--border)', cursor: 'pointer',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform = ''}>
                  <div style={{ position: 'relative', height: 190 }}>
                    <img src={v.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <PlayIcon />
                    <div style={{
                      position: 'absolute', bottom: 8, right: 8,
                      background: 'rgba(0,0,0,0.8)', color: 'white',
                      fontSize: 11, fontWeight: 600, padding: '2px 7px', borderRadius: 3,
                    }}>{v.duration}</div>
                  </div>
                  <div style={{ padding: '14px 16px 16px' }}>
                    <h3 style={{ fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 600, lineHeight: 1.35, marginBottom: 8 }}>{v.title}</h3>
                    <div style={{ display: 'flex', gap: 14 }}>
                      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{v.views} views</span>
                      <span style={{ fontSize: 12, color: 'var(--subtle)' }}>{v.date}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* ── TIKTOK ── */}
        {platform === 'TikTok' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
            {TIKTOK_POSTS.map(p => (
              <article key={p.id} style={{
                background: 'var(--bg2)', borderRadius: 8, overflow: 'hidden',
                border: '1px solid var(--border)', cursor: 'pointer',
                transition: 'transform 0.2s', position: 'relative',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = ''}>
                <div style={{ position: 'relative', paddingBottom: '177%', overflow: 'hidden' }}>
                  <img src={p.img} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)',
                  }} />
                  <PlayIcon />
                  <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10 }}>
                    <p style={{ fontSize: 11, lineHeight: 1.4, color: 'rgba(255,255,255,0.9)', marginBottom: 8 }}>{p.caption}</p>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>♥ {p.likes}</span>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>↗ {p.shares}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ── INSTAGRAM ── */}
        {platform === 'Instagram' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, borderRadius: 8, overflow: 'hidden' }}>
              {INSTAGRAM_POSTS.map(p => (
                <div key={p.id} style={{ position: 'relative', cursor: 'pointer', paddingBottom: '100%', overflow: 'hidden' }}
                  onMouseEnter={e => { const ov = e.currentTarget.querySelector('.ig-overlay'); if (ov) ov.style.opacity = 1; }}
                  onMouseLeave={e => { const ov = e.currentTarget.querySelector('.ig-overlay'); if (ov) ov.style.opacity = 0; }}>
                  <img src={p.img} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} />
                  <div className="ig-overlay" style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(0,0,0,0.55)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    opacity: 0, transition: 'opacity 0.2s',
                  }}>
                    <span style={{ fontSize: 18, fontWeight: 700 }}>♥ {p.likes}</span>
                    <p style={{ fontSize: 12, textAlign: 'center', padding: '0 12px', marginTop: 8, color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>{p.caption}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 28 }}>
              <button style={{
                background: 'none',
                border: '1px solid var(--border)', color: 'var(--muted)',
                padding: '10px 24px', borderRadius: 6,
                fontSize: 13, cursor: 'pointer',
              }}>Load more posts</button>
            </div>
          </div>
        )}

        {/* ── FACEBOOK ── */}
        {platform === 'Facebook' && (
          <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {FB_POSTS.map(p => (
              <article key={p.id} style={{
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: 10, overflow: 'hidden',
              }}>
                {/* Post header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px 12px' }}>
                  <img src={'images/logo.png'} alt="" style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>Dadventure</div>
                    <div style={{ fontSize: 12, color: 'var(--subtle)' }}>{p.date} · 🌐</div>
                  </div>
                </div>
                {/* Text */}
                <p style={{ padding: '0 18px 14px', fontSize: 15, lineHeight: 1.75, color: 'var(--muted)', whiteSpace: 'pre-line' }}>{p.text}</p>
                {/* Image */}
                {p.img && (
                  <div style={{ borderTop: '1px solid var(--border)' }}>
                    <img src={p.img} alt="" style={{ width: '100%', maxHeight: 340, objectFit: 'cover' }} />
                  </div>
                )}
                {/* Reactions */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 18px', borderTop: '1px solid var(--border)',
                }}>
                  <span style={{ fontSize: 13, color: 'var(--subtle)' }}>
                    👍 {p.likes.toLocaleString()} · 💬 {p.comments} · ↗ {p.shares}
                  </span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {['👍 Like','💬 Comment','↗ Share'].map(a => (
                      <button key={a} style={{
                        background: 'none', border: 'none',
                        color: 'var(--muted)', fontSize: 13, cursor: 'pointer',
                        padding: '4px 10px', borderRadius: 4,
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg3)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'none'}>{a}</button>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ── FOUNDERS CLUB PAGE ───────────────────────────────────────────────────────
const FoundersClubPage = () => {
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ firstName: '', email: '', password: '' });
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});

  const tiers = [
    {
      id: 'free',
      name: 'Trail Member',
      price: 'Free',
      sub: 'Forever',
      gradient: 'linear-gradient(135deg, oklch(27% 0.02 258), oklch(22% 0.025 260))',
      accent: 'var(--teal2)',
      border: 'var(--border)',
      badge: null,
      cta: 'Join Free',
      desc: 'Get started on the trail. Access the essentials, no card required.',
      perks: [
        'Weekly Thursday newsletter',
        'Full access to all articles & essays',
        'Gear guide access',
        'Travel destination guides',
        'Community comment access',
      ],
      locked: [
        'Founding Fathers Club forum',
        'Monthly live Q&As with contributors',
        'Exclusive member gear discounts',
        'Early access to events & meetups',
        'Founders badge + profile',
      ],
    },
    {
      id: 'monthly',
      name: 'Summit Member',
      price: '$9',
      sub: 'per month',
      gradient: 'linear-gradient(135deg, oklch(24% 0.06 192), oklch(20% 0.05 255))',
      accent: 'var(--teal)',
      border: 'oklch(57% 0.14 192 / 0.4)',
      badge: 'Most Popular',
      badgeColor: 'var(--teal)',
      cta: 'Start Monthly',
      desc: 'Full access to the Dadventure community, perks, and live programming.',
      perks: [
        'Everything in Trail Member',
        'Founding Fathers Club private forum',
        'Monthly live Q&As with contributors',
        'Exclusive member gear discounts (10–20%)',
        'Early access to events & meetups',
        'Summit Member badge + profile',
        'Ad-free reading experience',
      ],
      locked: [
        'Lifetime founding member status',
        'One-time physical welcome kit',
        'Name in the Founders wall of honor',
      ],
    },
    {
      id: 'lifetime',
      name: 'Founding Member',
      price: '$199',
      sub: 'one time',
      gradient: 'linear-gradient(135deg, oklch(22% 0.07 68), oklch(18% 0.05 285))',
      accent: 'var(--amber)',
      border: 'oklch(72% 0.14 66 / 0.5)',
      badge: 'Best Value',
      badgeColor: 'var(--amber)',
      cta: 'Become a Founder',
      desc: 'Founding member status for life. You helped build this — your name is on the wall.',
      perks: [
        'Everything in Summit Member',
        'Lifetime founding member status — never pay again',
        'Physical welcome kit (compass, patch, sticker pack)',
        'Name permanently in the Founders wall of honor',
        'Direct input on editorial direction',
        'Annual Founders-only virtual gathering',
        'Founding Member badge — the rarest on the site',
      ],
      locked: [],
    },
  ];

  const inputStyle = (err) => ({
    width: '100%',
    background: 'var(--bg4)',
    border: `1px solid ${err ? 'oklch(60% 0.18 20)' : 'var(--border)'}`,
    borderRadius: 6, color: 'var(--text)',
    fontSize: 15, padding: '12px 16px',
    fontFamily: 'var(--sans)', outline: 'none',
    transition: 'border-color 0.2s',
  });

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password || form.password.length < 6) e.password = 'Min 6 characters';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setDone(true);
  };

  const tier = tiers.find(t => t.id === selected);

  // ── Confirmation ──
  if (done && tier) return (
    <div className="fade-in" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 40, textAlign: 'center',
      background: tier.id === 'lifetime'
        ? 'radial-gradient(ellipse at 50% 20%, oklch(22% 0.07 68) 0%, var(--bg) 65%)'
        : 'radial-gradient(ellipse at 50% 20%, oklch(20% 0.05 192) 0%, var(--bg) 65%)',
    }}>
      <div style={{ maxWidth: 520 }}>
        <div style={{
          width: 88, height: 88, borderRadius: '50%', margin: '0 auto 28px',
          background: tier.gradient,
          border: `2px solid ${tier.accent}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36,
        }}>🧭</div>
        <div style={{
          display: 'inline-block', background: `${tier.accent}22`,
          border: `1px solid ${tier.accent}88`,
          color: tier.accent, fontSize: 11, fontWeight: 700,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          padding: '4px 14px', borderRadius: 20, marginBottom: 20,
        }}>{tier.name}</div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 42, fontWeight: 900, lineHeight: 1.15, marginBottom: 16 }}>
          Welcome to the club,{' '}
          <em style={{ color: tier.accent }}>{form.firstName}.</em>
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 17, lineHeight: 1.8 }}>
          {tier.id === 'lifetime'
            ? "You're a Founding Member of Dadventure. Your name goes on the wall. We're grateful you believe in what we're building."
            : tier.id === 'monthly'
            ? "You're now a Summit Member. The forum, live Q&As, and discounts are all yours. See you in there."
            : "You're on the trail. Your account is set up — check your inbox for the first Thursday dispatch."}
        </p>
        {tier.id === 'lifetime' && (
          <div style={{ marginTop: 28, padding: '18px 24px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8 }}>
            <div className="label label-amber" style={{ marginBottom: 8 }}>What happens next</div>
            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7 }}>Your physical welcome kit ships within 5–7 business days. Your name will appear on the Founders wall within 24 hours.</p>
          </div>
        )}
      </div>
    </div>
  );

  // ── Sign-up modal ──
  if (selected && tier) return (
    <div className="fade-in" style={{
      minHeight: '100vh',
      background: tier.id === 'lifetime'
        ? 'radial-gradient(ellipse at 60% 0%, oklch(22% 0.07 68) 0%, var(--bg2) 60%)'
        : 'radial-gradient(ellipse at 60% 0%, oklch(20% 0.05 192) 0%, var(--bg2) 60%)',
      padding: '100px 40px 80px',
    }}>
      <div style={{ maxWidth: 540, margin: '0 auto' }}>
        <button onClick={() => setSelected(null)} style={{
          background: 'none', border: 'none', color: 'var(--muted)',
          fontSize: 13, cursor: 'pointer', marginBottom: 28,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>← Back to plans</button>

        <div style={{
          display: 'inline-block', background: `${tier.accent}22`,
          border: `1px solid ${tier.accent}88`,
          color: tier.accent, fontSize: 11, fontWeight: 700,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          padding: '4px 14px', borderRadius: 20, marginBottom: 20,
        }}>{tier.name}</div>

        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 900, lineHeight: 1.15, marginBottom: 8 }}>
          {tier.id === 'free' ? 'Create your free account' : tier.id === 'monthly' ? 'Start your membership' : 'Become a Founding Member'}
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 16, marginBottom: 32, lineHeight: 1.7 }}>
          {tier.price === 'Free' ? 'No credit card needed.' : `${tier.price} ${tier.sub}. Cancel anytime.`}
        </p>

        <form onSubmit={handleSubmit} style={{
          background: 'var(--bg3)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '32px',
        }}>
          {[['firstName','First name','Marcus'],['email','Email address','you@example.com'],['password','Password','6+ characters']].map(([key, label, ph]) => (
            <div key={key} style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6, fontWeight: 500 }}>{label}</label>
              <input
                type={key === 'password' ? 'password' : key === 'email' ? 'email' : 'text'}
                value={form[key]}
                placeholder={ph}
                onChange={e => { setForm(f => ({...f, [key]: e.target.value})); setErrors(er => ({...er, [key]: null})); }}
                style={inputStyle(errors[key])}
              />
              {errors[key] && <div style={{ fontSize: 11, color: 'oklch(65% 0.18 20)', marginTop: 4 }}>{errors[key]}</div>}
            </div>
          ))}

          {tier.id !== 'free' && (
            <div style={{ marginBottom: 22, padding: '14px 16px', background: 'var(--bg4)', borderRadius: 7, border: '1px solid var(--border)' }}>
              <div className="label" style={{ marginBottom: 8 }}>Payment</div>
              <input placeholder="Card number" style={{...inputStyle(false), marginBottom: 10}} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <input placeholder="MM / YY" style={inputStyle(false)} />
                <input placeholder="CVC" style={inputStyle(false)} />
              </div>
            </div>
          )}

          <button type="submit" style={{
            width: '100%',
            background: tier.id === 'lifetime'
              ? 'linear-gradient(135deg, var(--amber), oklch(62% 0.15 285))'
              : 'linear-gradient(135deg, var(--teal), var(--amber))',
            border: 'none', color: '#0c0d14',
            padding: '14px', borderRadius: 7,
            fontSize: 15, fontWeight: 700, cursor: 'pointer',
          }}>{tier.cta} →</button>

          <p style={{ fontSize: 12, color: 'var(--subtle)', textAlign: 'center', marginTop: 14 }}>
            {tier.id === 'free' ? 'Free forever. No card needed.' : 'Secure checkout. Cancel or manage anytime.'}
          </p>
        </form>
      </div>
    </div>
  );

  // ── Main page ──
  return (
    <div className="fade-in">
      {/* Hero */}
      <div style={{
        background: 'radial-gradient(ellipse at 50% -10%, oklch(25% 0.07 68 / 0.6) 0%, var(--bg2) 55%)',
        padding: '130px 40px 70px',
        borderBottom: '1px solid var(--border)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'oklch(72% 0.14 66 / 0.12)',
            border: '1px solid oklch(72% 0.14 66 / 0.35)',
            color: 'var(--amber2)', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            padding: '5px 16px', borderRadius: 20, marginBottom: 24,
          }}>
            🧭 Founding Fathers Club
          </div>
          <h1 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 5vw, 68px)',
            fontWeight: 900, lineHeight: 1.1, marginBottom: 20,
          }}>
            Be part of something<br/>
            <em style={{ color: 'var(--amber2)' }}>worth building.</em>
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.8, maxWidth: 560, margin: '0 auto 36px' }}>
            The Founding Fathers Club is how Dadventure stays independent. No investors, no algorithm, no compromises — just dads supporting honest work about fatherhood.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            {[['2,400+', 'Members'], ['4', 'Years running'], ['100%', 'Independent']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 32, fontWeight: 900, color: 'var(--amber2)', lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 13, color: 'var(--subtle)', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing cards */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {tiers.map((t, i) => (
            <div key={t.id} style={{
              background: t.gradient,
              border: `1px solid ${t.border}`,
              borderRadius: 12,
              padding: '36px 32px 32px',
              display: 'flex', flexDirection: 'column',
              position: 'relative',
              transform: i === 2 ? 'none' : 'none',
              boxShadow: i === 2 ? `0 0 60px oklch(72% 0.14 66 / 0.12)` : i === 1 ? `0 0 40px oklch(57% 0.14 192 / 0.1)` : 'none',
            }}>
              {t.badge && (
                <div style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  background: t.badgeColor, color: '#0c0d14',
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                  padding: '4px 14px', borderRadius: 20, whiteSpace: 'nowrap',
                }}>{t.badge}</div>
              )}

              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.accent, marginBottom: 10 }}>{t.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontFamily: 'var(--serif)', fontSize: 48, fontWeight: 900, lineHeight: 1, color: 'var(--text)' }}>{t.price}</span>
                  {t.sub !== 'Forever' && <span style={{ fontSize: 14, color: 'var(--muted)' }}>{t.sub}</span>}
                </div>
                {t.sub === 'Forever' && <div style={{ fontSize: 13, color: 'var(--subtle)' }}>Free forever</div>}
              </div>

              <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.65, margin: '16px 0 24px', paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
                {t.desc}
              </p>

              {/* Perks */}
              <div style={{ flex: 1, marginBottom: 28 }}>
                {t.perks.map(p => (
                  <div key={p} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: t.accent, fontSize: 15, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.45 }}>{p}</span>
                  </div>
                ))}
                {t.locked.map(p => (
                  <div key={p} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start', opacity: 0.38 }}>
                    <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>–</span>
                    <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.45 }}>{p}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => setSelected(t.id)} style={{
                width: '100%',
                background: t.id === 'free'
                  ? 'none'
                  : t.id === 'lifetime'
                  ? 'linear-gradient(135deg, var(--amber), oklch(62% 0.15 285))'
                  : 'linear-gradient(135deg, var(--teal), oklch(50% 0.14 250))',
                border: t.id === 'free' ? `1px solid ${t.border}` : 'none',
                color: t.id === 'free' ? 'var(--muted)' : '#0c0d14',
                padding: '13px', borderRadius: 7,
                fontSize: 14, fontWeight: 700, cursor: 'pointer',
                transition: 'opacity 0.2s',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                {t.cta} →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* What you're funding */}
      <section style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '70px 40px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <SectionHead label="Where it goes" title="What your membership funds" sub="We're transparent about how member revenue is used." center />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginTop: 8 }}>
            {[
              { pct: '55%', label: 'Contributor pay', desc: 'We pay writers fairly. Always have.' },
              { pct: '20%', label: 'Editorial & editing', desc: 'Every piece is carefully edited.' },
              { pct: '15%', label: 'Photography & design', desc: 'Original imagery, no stock photos.' },
              { pct: '10%', label: 'Infrastructure', desc: 'Servers, tools, and the newsletter.' },
            ].map(({ pct, label, desc }) => (
              <div key={label} style={{ textAlign: 'center', padding: '28px 20px', background: 'var(--bg3)', borderRadius: 8, border: '1px solid var(--border)' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 40, fontWeight: 900, color: 'var(--amber2)', lineHeight: 1, marginBottom: 10 }}>{pct}</div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{label}</div>
                <div style={{ fontSize: 13, color: 'var(--subtle)', lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders wall teaser */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '70px 40px', textAlign: 'center' }}>
        <div className="label label-amber" style={{ marginBottom: 14 }}>The Wall</div>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 38, fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
          Founding Members are named here — forever.
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.75, maxWidth: 580, margin: '0 auto 36px' }}>
          Every Founding Member gets their name permanently listed below. This is how we say thank you to the people who made Dadventure possible.
        </p>
        <div style={{
          background: 'var(--bg2)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '28px 32px', marginBottom: 32,
          display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center',
        }}>
          {['Marcus W.', 'David P.', 'Sam R.', 'Jordan E.', 'Tomas R.', 'Chris F.', 'Ryan T.', 'James K.', 'Derek M.', 'Alex B.', 'Noah S.', 'Liam H.', 'Owen M.', 'Ethan C.', 'Lucas D.'].map(n => (
            <span key={n} style={{
              background: 'oklch(72% 0.14 66 / 0.1)',
              border: '1px solid oklch(72% 0.14 66 / 0.25)',
              color: 'var(--amber2)', fontSize: 13, fontWeight: 500,
              padding: '5px 14px', borderRadius: 20,
            }}>{n}</span>
          ))}
          <span style={{
            background: 'var(--bg3)', border: '1px solid var(--border)',
            color: 'var(--subtle)', fontSize: 13, fontStyle: 'italic',
            padding: '5px 14px', borderRadius: 20,
          }}>+ 2,385 more</span>
        </div>
        <button onClick={() => setSelected('lifetime')} style={{
          background: 'linear-gradient(135deg, var(--amber), oklch(62% 0.15 285))',
          border: 'none', color: '#0c0d14',
          padding: '13px 28px', borderRadius: 7,
          fontSize: 14, fontWeight: 700, cursor: 'pointer',
        }}>Add Your Name →</button>
      </section>
    </div>
  );
};

// ── EVENTS PAGE ──────────────────────────────────────────────────────────────
const EventsPage = () => {
  const LOGO_GRADIENT = 'linear-gradient(90deg, #E86830 0%, #D4446A 22%, #9B50C8 44%, #5B6BD4 62%, #38B8B0 80%, #3DCCA0 100%)';

  return (
    <div className="fade-in">
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(160deg, oklch(14% 0.03 255) 0%, var(--bg2) 70%)',
        padding: '120px 40px 0',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {/* Event title block */}
          <div style={{ marginBottom: 40 }}>
            <h1 style={{
              fontFamily: 'var(--serif)', fontWeight: 900,
              fontSize: 'clamp(42px, 6vw, 80px)',
              lineHeight: 1.05, marginBottom: 10,
              color: 'var(--text)',
            }}>
              Cap Hill Cleanup
            </h1>
            <div style={{
              fontFamily: 'var(--serif)', fontWeight: 900,
              fontSize: 'clamp(32px, 4.5vw, 60px)',
              lineHeight: 1.1, marginBottom: 20,
              background: LOGO_GRADIENT,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', display: 'block',
            }}>
              presented by Dadventure
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 17, maxWidth: 480, lineHeight: 1.7, marginBottom: 32 }}>
              Four years of showing up for our neighborhood. Join us the weekend before Father's Day.
            </p>

            {/* Info pills */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 48 }}>
              {[
                { icon: '📅', text: 'Sat & Sun, June 13–14, 2026' },
                { icon: '🕘', text: '9:00 AM – Noon' },
                { icon: '📍', text: 'Whole Foods, 11th & Emerson, Cap Hill' },
                { icon: '🆓', text: 'Free to Attend' },
              ].map(({ icon, text }) => (
                <div key={text} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border)',
                  borderRadius: 6, padding: '8px 16px',
                  fontSize: 13, color: 'var(--muted)',
                }}>
                  <span>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Thin gradient bar */}
          <div style={{ height: 3, background: LOGO_GRADIENT, borderRadius: 2 }} />
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '70px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>

          {/* Left: About the event */}
          <div>
            <div className="label label-accent" style={{ marginBottom: 16 }}>4th Annual</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 24 }}>
              Why we clean up.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, color: 'var(--muted)', fontSize: 16, lineHeight: 1.85 }}>
              <p>Cap Hill is one of Denver's most vibrant neighborhoods — and we want to keep it that way. Now in its 4th year, this cleanup is a tradition built by neighbors who give a damn.</p>
              <p>Dadventure believes fatherhood is practiced through action — not just words. Bring your kids, show your kids, teach your kids what it means to care for the place you call home.</p>
              <p>Gloves, bags, and vests are provided. Just show up.</p>
            </div>

            {/* WHO / HOW boxes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 36 }}>
              {[
                { label: 'Who?', icon: '👥', text: 'You. Your friends. Your kids. Your dogs. No experience needed. Just show up.' },
                { label: 'How?', icon: '🗺️', text: 'Meet at Whole Foods lot, 11th & Emerson, 9:00 AM. Everything is provided.' },
              ].map(({ label, icon, text }) => (
                <div key={label} style={{
                  background: 'var(--bg2)', border: '1px solid var(--border)',
                  borderRadius: 8, padding: '20px',
                }}>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{label}</div>
                  <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65 }}>{text}</p>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div style={{
              marginTop: 32, borderRadius: 8, overflow: 'hidden',
              border: '1px solid var(--border)', height: 200,
              background: 'var(--bg3)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 8,
            }}>
              <span style={{ fontSize: 28 }}>📍</span>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 600 }}>Whole Foods Market</div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>900 E 11th Ave (11th & Emerson), Capitol Hill, Denver</div>
              <a
                href="https://maps.google.com/?q=Whole+Foods+Market+900+E+11th+Ave+Denver+CO"
                target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 12, color: 'var(--teal2)', marginTop: 4 }}>
                Open in Google Maps →
              </a>
            </div>
          </div>

          {/* Right: Sign-up form */}
          <div>
            <div style={{
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderRadius: 12, overflow: 'hidden',
              boxShadow: '0 0 60px oklch(57% 0.14 192 / 0.08)',
            }}>
              {/* Form header */}
              <div style={{
                background: 'linear-gradient(135deg, oklch(20% 0.05 192), oklch(17% 0.04 255))',
                padding: '28px 32px', borderBottom: '1px solid var(--border)',
              }}>
                <div className="label label-accent" style={{ marginBottom: 10 }}>Reserve Your Spot</div>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>
                  Sign Up for the<br />Cap Hill Cleanup
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.65 }}>
                  Free to attend. Sign up so we know how many supplies to bring. You'll also join the Dadventure newsletter.
                </p>
              </div>

              {/* Kit.com embed CTA */}
              <div style={{ padding: '32px' }}>
                {/* Day selector */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500, marginBottom: 12 }}>Which day(s)?</div>
                  <DaySelector />
                </div>

                {/* Sign up button linking to Kit */}
                <a
                  href="https://dadventure.kit.com/95e79d6e7e"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'block', width: '100%',
                    background: 'linear-gradient(135deg, var(--teal), var(--amber))',
                    border: 'none', color: '#0c0d14',
                    padding: '16px', borderRadius: 8,
                    fontSize: 16, fontWeight: 700, cursor: 'pointer',
                    textAlign: 'center', textDecoration: 'none',
                    letterSpacing: '0.01em',
                    transition: 'opacity 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Reserve My Spot →
                </a>
                <p style={{ fontSize: 12, color: 'var(--subtle)', textAlign: 'center', marginTop: 12 }}>
                  Free to attend. You'll be added to the Dadventure newsletter.
                </p>

                {/* What to expect */}
                <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
                  <div className="label" style={{ marginBottom: 14 }}>What to expect</div>
                  {[
                    { icon: '🧤', text: 'Gloves, bags & vests provided' },
                    { icon: '☕', text: 'Coffee + snacks on us' },
                    { icon: '👶', text: 'Kid & dog friendly — bring the whole crew' },
                    { icon: '🕘', text: 'Meet 9:00 AM, done by noon' },
                    { icon: '🆓', text: 'Completely free' },
                  ].map(({ icon, text }) => (
                    <div key={text} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'center' }}>
                      <span style={{ fontSize: 16, width: 24, textAlign: 'center', flexShrink: 0 }}>{icon}</span>
                      <span style={{ fontSize: 14, color: 'var(--muted)' }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Past years */}
      <section style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '60px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionHead label="4 Years Strong" title="A tradition worth keeping." sub="Cap Hill has been our neighborhood classroom. Every year more dads, more kids, more dogs." center />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, marginTop: 8 }}>
            {[
              { year: '2023', stat: '1st year', note: 'A handful of dads and a lot of enthusiasm.' },
              { year: '2024', stat: '2nd year', note: 'Word spread. The crew doubled.' },
              { year: '2025', stat: '3rd year', note: 'Kids outnumbered the adults. Good sign.' },
              { year: '2026', stat: 'This year', note: 'June 13–14. Be there.' },
            ].map(({ year, stat, note }) => (
              <div key={year} style={{
                background: 'var(--bg3)', border: '1px solid var(--border)',
                borderRadius: 8, padding: '24px 20px', textAlign: 'center',
              }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 900, color: 'var(--amber2)', lineHeight: 1 }}>{year}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--teal2)', margin: '8px 0 6px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{stat}</div>
                <p style={{ fontSize: 13, color: 'var(--subtle)', lineHeight: 1.6 }}>{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '70px 40px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 38, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
          Show up. Bring your kids.<br />
          <em style={{ color: 'var(--teal2)' }}>That's the whole plan.</em>
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.75, marginBottom: 28 }}>
          June 13–14 · 9AM–Noon · Whole Foods, 11th & Emerson, Cap Hill · Free
        </p>
        <a
          href="https://dadventure.kit.com/95e79d6e7e"
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, var(--teal), var(--amber))',
            border: 'none', color: '#0c0d14',
            padding: '14px 32px', borderRadius: 7,
            fontSize: 15, fontWeight: 700, cursor: 'pointer',
            textDecoration: 'none', letterSpacing: '0.02em',
          }}>
          Sign Up Free →
        </a>
      </section>
    </div>
  );
};

// Day selector sub-component
const DaySelector = () => {
  const [selected, setSelected] = React.useState('both');
  const days = [
    { id: 'sat', label: 'Sat June 13' },
    { id: 'sun', label: 'Sun June 14' },
    { id: 'both', label: 'Both Days!' },
  ];
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {days.map(d => (
        <button key={d.id} onClick={() => setSelected(d.id)} style={{
          flex: 1, padding: '12px 8px',
          background: selected === d.id ? 'none' : 'var(--bg3)',
          border: `1.5px solid ${selected === d.id ? 'var(--teal)' : 'var(--border)'}`,
          color: selected === d.id ? 'var(--teal2)' : 'var(--muted)',
          borderRadius: 7, fontSize: 13, fontWeight: selected === d.id ? 700 : 400,
          cursor: 'pointer', transition: 'all 0.15s',
        }}>{d.label}</button>
      ))}
    </div>
  );
};

// ── SUBSCRIBE PAGE ────────────────────────────────────────────────────────────
const SubscribePage = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', interests: [] });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const interests = [
    { id: 'stories', label: 'Stories & Essays', desc: 'Personal narratives from real dads', color: 'teal' },
    { id: 'gear',    label: 'Gear Reviews',     desc: 'Honest picks tested in the field',  color: 'amber' },
    { id: 'travel',  label: 'Travel Guides',    desc: 'Destinations and trip reports',     color: 'purple' },
    { id: 'blog',    label: 'The Blog',          desc: 'Weekly essays and observations',   color: 'teal' },
    { id: 'news',    label: 'Dad News',          desc: "What's happening in fatherhood",   color: 'amber' },
    { id: 'deals',   label: 'Gear Deals',        desc: 'Sales on stuff we actually like',  color: 'purple' },
  ];

  const catColors = {
    teal:   { bg: 'oklch(57% 0.14 192 / 0.15)', border: 'oklch(57% 0.14 192 / 0.5)', text: 'oklch(68% 0.11 192)' },
    amber:  { bg: 'oklch(72% 0.14 66 / 0.15)',  border: 'oklch(72% 0.14 66 / 0.5)',  text: 'oklch(82% 0.10 66)'  },
    purple: { bg: 'oklch(52% 0.19 285 / 0.15)', border: 'oklch(52% 0.19 285 / 0.5)', text: 'oklch(62% 0.15 285)' },
  };

  const toggleInterest = (id) => {
    setForm(f => ({
      ...f,
      interests: f.interests.includes(id) ? f.interests.filter(i => i !== id) : [...f.interests, id],
    }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (form.interests.length === 0) e.interests = 'Pick at least one';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const inputStyle = (err) => ({
    width: '100%',
    background: 'var(--bg3)',
    border: `1px solid ${err ? 'oklch(60% 0.18 20)' : 'var(--border)'}`,
    borderRadius: 6,
    color: 'var(--text)',
    fontSize: 15,
    padding: '12px 16px',
    fontFamily: 'var(--sans)',
    outline: 'none',
    transition: 'border-color 0.2s',
  });

  if (submitted) return (
    <div className="fade-in" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px', textAlign: 'center',
      background: 'radial-gradient(ellipse at 50% 30%, oklch(20% 0.05 192) 0%, var(--bg) 70%)',
    }}>
      <div style={{ maxWidth: 520 }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%', margin: '0 auto 28px',
          background: 'linear-gradient(135deg, var(--teal), var(--amber))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32,
        }}>✓</div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 40, fontWeight: 900, lineHeight: 1.15, marginBottom: 16 }}>
          You're on the trail,{' '}
          <em style={{ color: 'var(--amber2)' }}>{form.firstName}.</em>
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 17, lineHeight: 1.8, marginBottom: 10 }}>
          Welcome to Dadventure. Your first dispatch lands in your inbox Thursday morning.
        </p>
        <p style={{ color: 'var(--subtle)', fontSize: 14 }}>Check your spam folder if it doesn't show — then add us to your contacts.</p>
        <div style={{
          marginTop: 36, padding: '20px 24px',
          background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8,
          display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center',
        }}>
          <div className="label" style={{ width: '100%', marginBottom: 4 }}>Your subscriptions</div>
          {form.interests.map(id => {
            const item = interests.find(i => i.id === id);
            const c = catColors[item.color];
            return (
              <span key={id} style={{
                background: c.bg, border: `1px solid ${c.border}`,
                color: c.text, padding: '4px 12px', borderRadius: 20,
                fontSize: 12, fontWeight: 600,
              }}>{item.label}</span>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fade-in">
      {/* Hero */}
      <div style={{
        background: 'radial-gradient(ellipse at 60% 0%, oklch(20% 0.06 192) 0%, var(--bg2) 60%)',
        padding: '130px 40px 70px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="label label-accent" style={{ marginBottom: 14 }}>Newsletter</div>
            <h1 style={{
              fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 4vw, 58px)',
              fontWeight: 900, lineHeight: 1.1, marginBottom: 20,
            }}>
              Navigate fatherhood<br/>
              <em style={{ color: 'var(--amber2)' }}>with us.</em>
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: 17, lineHeight: 1.8, maxWidth: 420 }}>
              Every Thursday we send a dispatch from the trail — stories, gear worth buying, places worth going, and honest writing about what this life actually looks like.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 36 }}>
              {[
                { icon: '📬', text: 'One email a week. No more.' },
                { icon: '🚫', text: 'No ads, no sponsored slop, no listicles.' },
                { icon: '✌️', text: 'Unsubscribe any time, no hard feelings.' },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 18 }}>{icon}</span>
                  <span style={{ color: 'var(--muted)', fontSize: 15 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{
            background: 'var(--bg3)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '36px 36px 32px',
          }}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 700, marginBottom: 24 }}>
              Sign up free
            </h2>

            {/* Name row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
              {[['firstName','First name'],['lastName','Last name (optional)']].map(([key, label]) => (
                <div key={key}>
                  <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6, fontWeight: 500 }}>{label}</label>
                  <input
                    value={form[key]}
                    onChange={e => { setForm(f => ({...f, [key]: e.target.value})); setErrors(er => ({...er, [key]: null})); }}
                    placeholder={key === 'firstName' ? 'Marcus' : 'Webb'}
                    style={inputStyle(errors[key])}
                  />
                  {errors[key] && <div style={{ fontSize: 11, color: 'oklch(65% 0.18 20)', marginTop: 4 }}>{errors[key]}</div>}
                </div>
              ))}
            </div>

            {/* Email */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6, fontWeight: 500 }}>Email address</label>
              <input
                type="email"
                value={form.email}
                onChange={e => { setForm(f => ({...f, email: e.target.value})); setErrors(er => ({...er, email: null})); }}
                placeholder="you@example.com"
                style={inputStyle(errors.email)}
              />
              {errors.email && <div style={{ fontSize: 11, color: 'oklch(65% 0.18 20)', marginTop: 4 }}>{errors.email}</div>}
            </div>

            {/* Interests */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 12, fontWeight: 500 }}>
                What are you into? <span style={{ color: 'var(--subtle)' }}>(pick all that apply)</span>
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {interests.map(({ id, label, desc, color }) => {
                  const sel = form.interests.includes(id);
                  const c = catColors[color];
                  return (
                    <button type="button" key={id} onClick={() => { toggleInterest(id); setErrors(er => ({...er, interests: null})); }}
                      style={{
                        background: sel ? c.bg : 'var(--bg4)',
                        border: `1px solid ${sel ? c.border : 'var(--border)'}`,
                        borderRadius: 7, padding: '10px 12px',
                        textAlign: 'left', cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: sel ? c.text : 'var(--text)', marginBottom: 2 }}>{label}</div>
                      <div style={{ fontSize: 11, color: 'var(--subtle)' }}>{desc}</div>
                    </button>
                  );
                })}
              </div>
              {errors.interests && <div style={{ fontSize: 11, color: 'oklch(65% 0.18 20)', marginTop: 6 }}>{errors.interests}</div>}
            </div>

            <button type="submit" style={{
              width: '100%',
              background: 'linear-gradient(135deg, var(--teal), var(--amber))',
              border: 'none', color: '#0c0d14',
              padding: '14px', borderRadius: 7,
              fontSize: 15, fontWeight: 700, cursor: 'pointer',
              letterSpacing: '0.02em', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              Join the Dadventure →
            </button>

            <p style={{ fontSize: 12, color: 'var(--subtle)', textAlign: 'center', marginTop: 14 }}>
              Free forever. No credit card. No nonsense.
            </p>
          </form>
        </div>
      </div>

      {/* Social proof */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '70px 40px' }}>
        <SectionHead label="What Readers Say" title="From the inbox" center />
        <div className="grid-3" style={{ marginTop: 8 }}>
          {[
            { quote: 'The only newsletter I actually look forward to on Thursday. Honest, funny, and it makes me want to be a better dad.', name: 'Ryan T., Portland OR', since: 'Subscriber since 2024' },
            { quote: 'I found this after my son was born and felt completely lost. This community changed how I think about fatherhood.', name: 'James K., Austin TX', since: 'Subscriber since 2023' },
            { quote: 'The gear recommendations alone are worth it. No fluff, no affiliate tricks. Just stuff that actually works.', name: 'Derek M., Denver CO', since: 'Subscriber since 2025' },
          ].map((t, i) => (
            <div key={i} style={{
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '28px 26px',
            }}>
              <div style={{ fontSize: 28, color: 'var(--teal2)', lineHeight: 1, marginBottom: 14, fontFamily: 'var(--serif)' }}>"</div>
              <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.75, marginBottom: 20, fontStyle: 'italic' }}>{t.quote}</p>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: 'var(--subtle)', marginTop: 2 }}>{t.since}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// ── APP ───────────────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentGradient": "teal-amber",
  "heroOverlay": "medium",
  "cardStyle": "flat"
}/*EDITMODE-END*/;

const App = () => {
  const [page, setPage] = useState(() => localStorage.getItem('dav-page') || 'Home');
  const [scrolled, setScrolled] = useState(false);
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [showTweaks, setShowTweaks] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('dav-page', page);
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, [page]);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 10);
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // Tweaks panel
  useEffect(() => {
    window.addEventListener('message', e => {
      if (e.data?.type === '__activate_edit_mode') setShowTweaks(true);
      if (e.data?.type === '__deactivate_edit_mode') setShowTweaks(false);
    });
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
  }, []);

  const pages = { Home: HomePage, About: AboutPage, 'News & Stories': StoriesPage, Stories: StoriesPage, Blog: BlogPage, Events: EventsPage, Resources: (props) => <ResourcesPage {...props} setPage={setPage} />, Gear: GearPage, Travel: TravelPage, Social: SocialPage, DadDinner: DadDinnerPage, DadAdventures: DadAdventuresPage, GetInvolved: GetInvolvedPage, 'Founding Fathers': FoundersClubPage, Subscribe: SubscribePage };
  const PageComp = pages[page] || HomePage;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header page={page} setPage={setPage} scrolled={scrolled} />
      <main ref={mainRef} style={{ flex: 1, overflowY: 'auto' }}>
        <PageComp setPage={setPage} />
      </main>

      {/* Tweaks Panel */}
      {showTweaks && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 999,
          background: 'var(--bg3)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '20px 22px', width: 260,
          boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
        }}>
          <div style={{ fontWeight: 600, marginBottom: 16, fontSize: 14 }}>Tweaks</div>
          {[
            { label: 'Accent Gradient', key: 'accentGradient', opts: ['purple-teal', 'teal-amber', 'amber-purple'] },
            { label: 'Hero Overlay', key: 'heroOverlay', opts: ['dark', 'medium', 'light'] },
            { label: 'Card Style', key: 'cardStyle', opts: ['elevated', 'flat', 'bordered'] },
          ].map(t => (
            <div key={t.key} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t.label}</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {t.opts.map(o => (
                  <button key={o} onClick={() => {
                    const next = { ...tweaks, [t.key]: o };
                    setTweaks(next);
                    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: next }, '*');
                  }} style={{
                    background: tweaks[t.key] === o ? 'var(--teal)' : 'var(--bg4)',
                    border: 'none', color: tweaks[t.key] === o ? 'white' : 'var(--muted)',
                    padding: '4px 10px', borderRadius: 4, fontSize: 11, cursor: 'pointer',
                  }}>{o}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
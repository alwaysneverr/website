// Field notes: real-world references in "Chitose Is in the Ramune Bottle" (Chitose-kun wa Ramune Bin no Naka):
// product placements, songs, books, TV and film, and anything else the story points at in the real world.
// Same shape as imosae.js, one entry per volume with its items. Rendered by _includes/field-notes.njk, which
// adds a dropdown to switch between the media below.
// Chapters are numbered here, so each volume lists its chapter names and items give the chapter number:
// shown as "Chapter One: Popular Bad Boys Do Well in High School". A key that isn't a number, like
// "prologue", shows just its name.
//
// Each item:
//   name     what's referenced (brand, song, book title, person…)
//   type     what kind of thing it is, shown as a badge on the card
//   medium   which dropdown entry it's under (a key from `media` below); leave it out for product placements
//   image    product placements: the brand's logo (on a white tile). Without one the product stays commented out.
//            everything else: optional cover art, book cover, poster or photo, shown whole over a blurred copy
//            of itself. Without one the card shows the medium's icon instead.
//            Keep them in public/assets/images/chiramune/<medium>/, e.g. image: "/assets/images/chiramune/books/phantom-lady.jpg"
//   imageAlt optional description of the image for screen readers (defaults to the name)
//   by       songs (or `artist`), books, shows, people: who it's by, shown under the name
//   spotify  songs: a Spotify track link (or a search link, open.spotify.com/search/…, when there's no one recording)
//   link, linkLabel   optional link on a non-product card (e.g. a Wikipedia page), with its button text
//   note     a short explanation shown on the card
export default {
  series: "Chitose Is in the Ramune Bottle",
  // Product placement images are brand logos: they sit on a white tile in both themes so dark and coloured logos
  // stay visible. Other media's images are shown as covers instead.
  logos: true,
  // The cards sit inside a ramune bottle (see _field-notes.scss)
  theme: "ramune",
  // The dropdown, in order; the first shows when the page opens. `title` replaces the page heading.
  media: [
    { key: "products", label: "Product Placements", title: "Product Placements!", icon: "🛍️" },
    { key: "songs", label: "Songs", title: "Songs!", icon: "♪" },
    { key: "books", label: "Books", title: "Books!", icon: "📖" },
    { key: "screen", label: "TV & Film", title: "On Screen!", icon: "📺" },
    { key: "other", label: "Other References", title: "Other References!", icon: "✦" },
  ],
  volumes: [
    {
      volume: 1,
      chapters: {
        1: "Popular Bad Boys Do Well in High School",
        2: "Kenta Is in His Room",
        3: "Let the Mutual Understanding Commence",
        4: "The Nail That Sticks Up Gets Hammered Down...?",
        5: "A Full Moon, like a Glass Marble Sinking in a Bottle of Ramune Soda",
      },
      items: [
        { name: "Gregory", type: "Backpack", chapter: 1, page: 1, quote: "My <b><u>Gregory</u></b>-brand backpack...", image: "/assets/images/logos/gregory.svg" },
        { name: "Lucky Strike", type: "Cigarettes", chapter: 1, page: 35, quote: "Kura pulled a crumpled packet of <b><u>Lucky Strike</u></b> out of his breast pocket and lit up his second cigarette in a row.", image: "/assets/images/logos/lucky-strike.svg" },
        { name: "Phantom Lady", type: "Novel", medium: "books", by: "Cornell Woolrich", chapter: 1, page: 41, quote: "It's <b><u>Phantom Lady</u></b> by Cornell Woolrich." },
        { name: "Kumamon", type: "Mascot", medium: "other", by: "Kumamoto Prefecture", note: "Kumamoto Prefecture’s black bear mascot, one of the most famous in Japan. Saku’s joke is about Yua ending her sentences with “mon.”", chapter: 2, page: 6, quote: "But we can't allow ourselves to get mad, mon! We gotta rise above, mon!” Who are you, <b><u>Kumamon</u></b>?" },
        { name: "Laugh Maker", type: "Song", medium: "songs", chapter: 2, page: 45, quote: "Oh, don't you know the song? ‘<b><u>Laugh Maker</u></b>’? By the band Bump of Chicken?", artist: "BUMP OF CHICKEN", spotify: "https://open.spotify.com/track/3gpWGXm7VTLLRh2oFQCG38" },
        // { name: "Rubik's Cube", type: "Puzzle Toy", chapter: 2, page: 55, quote: "...solving the <b><u>Rubik's Cube</u></b> or something...", image: null },
        { name: "Lpa", type: "Shopping Mall", chapter: 2, page: 82, quote: "...All right, we'll have to take you shopping at <b><u>Lpa</u></b> next weekend.", image: "/assets/images/logos/lpa.png" },
        { name: "Starbucks", type: "Cafe", chapter: 2, page: 82, quote: "...but it also has a movie theater, an arcade, karaoke, and even a <b><u>Starbucks</u></b>...", image: "/assets/images/logos/starbucks.svg" },
        { name: "Sid Vicious", type: "Musician", medium: "other", by: "Sex Pistols", note: "Bassist of the Sex Pistols and the face of 1970s British punk.", chapter: 2, page: 82, quote: "Who do you think you are, <b><u>Sid Vicious</u></b>? Some punk rocker?" },
        { name: "Raymond Chandler", type: "Author", medium: "books", by: "Hard-boiled fiction", chapter: 2, page: 90, quote: "You can learn a lot from reading someone like <b><u>Raymond Chandler</u></b>. Any hard-boiled fiction, in fact." },
        { name: "McDonald's", type: "Restaurant", chapter: 3, page: 11, quote: "She would always share her nuggets and fries at <b><u>McDonald's</u></b>.", image: "/assets/images/logos/mcdonalds.svg" },
        { name: "Romeo and Juliet", type: "Play", medium: "books", by: "William Shakespeare", chapter: 3, page: 23, quote: "And who cares about social status when it comes to romance? Hasn't this bitch ever heard of <b><u>Romeo and Juliet</u></b>?!" },
        { name: "JINS", type: "Eyewear Store", chapter: 3, page: 44, quote: "...We headed to <b><u>JINS</u></b>, the eyewear store...", image: "/assets/images/logos/JINS.svg" },
        { name: "Adidas", type: "Sneakers", chapter: 3, page: 52, quote: "No. Plain is good. For sneakers, you should go for some <b><u>Adidas</u></b> Stan Smiths, like the ones I'm wearing. Or the <b><u>Adidas</u></b> Superstars...", image: "/assets/images/logos/adidas.svg" },
        { name: "Nike", type: "Sneakers", chapter: 3, page: 52, quote: "You can also go for some <b><u>Nike</u></b> Air Force 1...", image: "/assets/images/logos/nike.svg" },
        { name: "Converse", type: "Sneakers", chapter: 3, page: 52, quote: "...some <b><u>Converse</u></b> All stars, or <b><u>Converse</u></b> One Stars.", image: "/assets/images/logos/converse.svg" },
        { name: "New Balance", type: "Sneakers", chapter: 3, page: 52, quote: "...Or some <b><u>New Balance</u></b> 996s...", image: "/assets/images/logos/new-balance.svg" },
        { name: "Vans", type: "Sneakers", chapter: 3, page: 52, quote: "...or <b><u>Vans</u></b> Authentics...", image: "/assets/images/logos/vans.svg" },
        { name: "MUJI", type: "Clothing Store", chapter: 3, page: 53, quote: "...Next, we headed to <b><u>MUJI</u></b> to pick out some tops and pants.", image: "/assets/images/logos/muji.svg" },
        { name: "UNIQLO", type: "Clothing Store", chapter: 3, page: 53, quote: "<b><u>Uniqlo</u></b> might have worked, too. But <b><u>Uniqlo</u></b> has too much stuff with patterns...", image: "/assets/images/logos/uniqlo-en.svg", hoverImage: "/assets/images/logos/uniqlo.svg" },
        { name: "Gramicci", type: "Jeans", chapter: 3, page: 56, quote: "I was wearing my Adidas Stan Smiths, <b><u>Gramicci</u></b> jeans...", image: "/assets/images/logos/gramicci.png" },
        { name: "Champion", type: "Shirt", chapter: 3, page: 56, quote: "...a white <b><u>Champion</u></b> T-Shirt with a chest pocket", image: "/assets/images/logos/champion.svg" },
        // { name: "(Casio) G-SHOCK", type: "Watch", chapter: 3, page: 56, quote: "...and my <b><u>G-SHOCK</u></b> GWM5610 wristwatch with black-and-white display.", image: null },
        { name: "Steve Jobs", type: "Person", medium: "other", by: "Apple", note: "Apple’s co-founder, whose daily uniform was the exact outfit Saku lists: New Balance, Levi’s 501s and an Issey Miyake turtleneck.", chapter: 3, page: 57, quote: "You know how <b><u>Steve Jobs</u></b> was known for always wearing the same outfit? New Balance M992s, Levi's 501s, and an Issey Miyake black turtleneck." },
        { name: "Levi's", type: "Jeans", chapter: 3, page: 58, quote: "...New Balance M992s, <b><u>Levi's</u></b> 501s...", image: "/assets/images/logos/levis.svg" },
        { name: "Issey Miyake", type: "Turtleneck", chapter: 3, page: 58, quote: "...and an <b><u>Issey Miyake</u></b> black turtleneck.", image: "/assets/images/logos/issey-miyake.svg" },
        { name: "Mark Zuckerberg", type: "Person", medium: "other", by: "Facebook", note: "Facebook’s founder, known for wearing the same gray T-shirt every day so he had one less decision to make.", chapter: 3, page: 58, quote: "And then there's <b><u>Mark Zuckerberg</u></b>, who created Facebook. He always wears the same gray T-shirt." },
        { name: "Arc'teryx", type: "Backpack", chapter: 3, page: 63, quote: "For backpacks, I recommend the Arro by <b><u>Arc'teryx</u></b>...", image: "/assets/images/logos/arc-teryx.svg" },
        { name: "Mystery Ranch", type: "Backpack", chapter: 3, page: 63, quote: "...you should go for the <b><u>Mystery Ranch</u></b>'s Invader or the Outsider.", image: "/assets/images/logos/mystery-ranch.svg" },
        { name: "Gucci", type: "Fashion", chapter: 3, page: 63, quote: "Somehow, she made that awful thing look stylish in her hand, like a studded <b><u>Gucci</u></b> purse.", image: "/assets/images/logos/gucci.svg" },
        { name: "Koushien", type: "Tournament", medium: "other", by: "Koshien Stadium, Hyogo", note: "Japan’s national high school baseball tournament, played every summer at Koshien Stadium in Nishinomiya. Reaching it is every high school player’s dream.", chapter: 4, page: 6, quote: "I figured you got into this school just so you could have a shot at the <b><u>Koushien National High School Baseball Tournament</u></b>, but no…" },
        // Waiting on a logo: uncomment once `image` points at one
        // { name: "Hachiban Ramen", type: "Restaurant", chapter: 4, page: 12, quote: "After school, I took Kenta to <b><u>Hachiban Ramen</u></b>, the ramen joint near our school.", image: null },
        // { name: "GIOS", type: "Bicycle", chapter: 4, page: 23, quote: "Haru hopped back onto her blue <b><u>GIOS</u></b> hybrid bicycle...", image: null },
        { name: "Tour de France", type: "Bicycle Race", medium: "other", by: "Cycling's biggest race", note: "The three-week bicycle race around France, the most famous in the world.", chapter: 4, page: 23, quote: "That's like commuting to school by bicycle every day but then suddenly being forced to compete in the <b><u>Tour de France</u></b>." },
        { name: "Pocari Sweat", type: "Drink", chapter: 4, page: 33, quote: "I handed Haru her bottle of <b><u>Pocari Sweat</u></b> electrolyte drink and her hot dog on a stick...", image: "/assets/images/logos/pocari-sweat.svg" },
        // { name: "Royal Sawayaka", type: "Drink", chapter: 4, page: 34, quote: "...I popped the lid of my bottle of <b><u>Royal Sawayaka</u></b> soda, a Fukui staple, and chugged it.", image: null },
        { name: "Mother Teresa", type: "Person", medium: "other", by: "Missionaries of Charity", note: "The Catholic nun known worldwide for her work with the poor in Kolkata; she received the Nobel Peace Prize in 1979.", chapter: 5, page: 28, quote: "We're your classmates; we're not your mom. We're not <b><u>Mother Teresa</u></b>." },
        { name: "The Door into Summer", type: "Novel", medium: "books", by: "Robert A. Heinlein", chapter: 5, page: 46, quote: "...and read some of <b><u>The Door into Summer</u></b> by Heinlein before passing out." },
      ]
    },
    {
      volume: 2,
      chapters: {
        1: "A Transient Starting Line",
        2: "Auspicious Days and Ordinary Days",
        3: "Defined Relationships and Undefined Distances",
        4: "A Distant Moon",
        epilogue: "The Girl"
      },
      items: [
        { name: "Bianchi", type: "Bicycle", chapter: 1, page: 4, quote: "There was a Celeste-blue <b><u>Bianchi</u></b> mountain bike parked outside of the shop...", image: "/assets/images/logos/bianchi.svg" },
        { name: "Pocari Sweat", type: "Drink", chapter: 1, page: 36, quote: "...I grabbed the bottles of <b><u>Pocari Sweat</u></b>...", image: "/assets/images/logos/pocari-sweat.svg" },
        // Waiting on a logo: uncomment once `image` points at one
        // { name: "Europe-Ken", type: "Restaurant", chapter: 2, page: 28, quote: "Katsudon. From <b><u>Europe-Ken</u></b>, Fukui's finest katsudon eatery!", image: null },
        { name: "Guild", type: "Song", medium: "songs", chapter: 2, page: 48, quote: "It was an old song, “<b><u>Guild</u></b>,” by Bump of Chicken.", artist: "BUMP OF CHICKEN", spotify: "https://open.spotify.com/track/476fkloGbPggQyYPOhKr3v" },
        { name: "The Box Man", type: "Novel", medium: "books", by: "Kobo Abe", chapter: 2, page: 51, quote: "“The <b><u>Box Man</u></b>, by Kobo Abe?”" },
        // { name: "Hachiban Ramen", type: "Restaurant", chapter: 2, page: 87, quote: "I'll treat you to a bowl of <b><u>Hachiban's</u></b> sometime soon...", image: null },
        // { name: "Chupet", type: "Ice Pop", chapter: 2, page: 89, quote: "...a type of popsicle called a <b><u>Chupet</u></b> that comes in a plastic tube you can snap in half and share.", image: null },
        // { name: "Saizeriya", type: "Restaurant", chapter: 3, page: 1, quote: "I headed to a local <b><u>Saizeriya</u></b> restaurant with Tomoya to do some studying for the tests.", image: null },
        { name: "Michael Jackson", type: "Musician", medium: "other", by: "King of Pop", note: "The King of Pop, whose moonwalk made walking backward look effortless.", chapter: 3, page: 22, quote: "Well, you're not <b><u>Michael Jackson</u></b>. It's hard not to go forward when that's the way you're facing. Ever tried to moonwalk? Not that easy." },
        { name: "Ultraman", type: "TV Series", medium: "screen", by: "Tsuburaya Productions", chapter: 3, page: 30, quote: "Everyone got a good look at his cute <b><u>Ultraman</u></b>-print briefs." },
        // Songs without one definitive recording link to a Spotify search; swap in a track link to pick a version
        { name: "Teru Teru Bozu", type: "Song", medium: "songs", chapter: 3, page: 31, quote: "I launched into a discordant but enthusiastic rendition of “<b><u>Teru Teru Bozu</u></b>,” followed by “Ame Furi,” two classic children's songs about rain.", artist: "Children's song", spotify: "https://open.spotify.com/search/てるてる坊主" },
        { name: "Ame Furi", type: "Song", medium: "songs", chapter: 3, page: 31, quote: "...followed by “<b><u>Ame Furi</u></b>,” two classic children's songs about rain.", artist: "Children's song", spotify: "https://open.spotify.com/search/あめふり" },
        { name: "Lucky Strike", type: "Cigarettes", chapter: 3, page: 37, quote: "Kura crumpled up his pack of <b><u>Lucky Strikes</u></b>, which seemed to be empty anyway.", image: "/assets/images/logos/lucky-strike.svg" },
        // { name: "Seven Stars", type: "Cigarettes", chapter: 3, page: 37, quote: "Kura yanked a pack of <b><u>Seven Star</u></b> out of the pocket, then lit one up with his own lighter.", image: null },
        { name: "Nissan", type: "Car", chapter: 3, page: 39, quote: "...we had Kura drive us a safe distance in his beat-up <b><u>Nissan</u></b> Rasheen...", image: "/assets/images/logos/nissan.svg" },
        // { name: "Tivoli Audio", type: "Radio", chapter: 3, page: 41, quote: "...and a <b><u>Tivoli Audio</u></b> radio that was placed in one corner.", image: null },
        { name: "Singin' in the Rain", type: "Song", medium: "songs", chapter: 3, page: 65, quote: "Since the weather today had been so gloomy, they were playing songs like “<b><u>Singin' in the Rain</u></b>” and “Rainy Days and Mondays.”", artist: "Gene Kelly", spotify: "https://open.spotify.com/track/5U3MkUWTpzj37A33GboDtv" },
        { name: "Rainy Days and Mondays", type: "Song", medium: "songs", chapter: 3, page: 65, quote: "...they were playing songs like “Singin' in the Rain” and “<b><u>Rainy Days and Mondays</u></b>.”", artist: "Carpenters", spotify: "https://open.spotify.com/track/5cbZDpFu1hTwaU7hDQpf13" },
        { name: "Fukuititan", type: "Dinosaur", medium: "other", by: "Fukui Station's dinosaur plaza", note: "A long-necked dinosaur discovered in Fukui, one of several species named after the prefecture. Life-size moving models of it and its neighbors stand outside Fukui Station.", chapter: 3, page: 80, quote: "In the plaza, the moving dinosaur monuments were illuminated. The symbolic, long-necked <b><u>Fukuititan</u></b>, and opposite him, the Fukuisaurus and the Fukuiraptor." },
        { name: "Hajimete no Otsukai", type: "TV Show", medium: "screen", by: "Nippon TV", chapter: 3, page: 83, quote: "You know, I love watching that TV show, <b><u>Hajimete no Otsukai</u></b>. The one where they send little kids off running errands by themselves." },
        { name: "Shogenai de yo Baby", type: "Song", medium: "songs", chapter: 3, page: 83, quote: "Well, if I fall down and start crying, will you comfort me by singing ‘<b><u>Shogenai de yo Baby</u></b>’…?", artist: "B.B. Queens", spotify: "https://open.spotify.com/track/6cBRPeUMGswQNOayQ9lBjz" },
      ]
    },
    {
      volume: 3,
      // Pages from here on are estimated from position in the chapter (about 1,255 characters a page)
      chapters: {
        prologue: "The Moon That Day",
        1: "Rainy with a Chance of Dreams",
        2: "Illusions, Drop-kicked",
        3: "The Blue Night of the Faraway Sky We'll Remember Someday",
        4: "Tomorrow's Breeze",
        epilogue: "The Moon This Day",
        sidestory: "Side Story: The King and the Birthday",
      },
      items: [
        { name: "Seiko Crab", type: "Food", medium: "other", by: "Fukui seafood", note: "Seikogani, the female snow crab: a winter delicacy from Fukui's coast. They're small, so getting the meat out of the legs is fiddly work.", chapter: 1, page: 8, quote: "...until he perfectly shucks 104 <b><u>Seiko crab</u></b> legs, a Fukui seafood delicacy." },
        { name: "Go to the Wild Side", type: "Song", medium: "songs", chapter: 1, page: 33, quote: "Glim Spanky's “<b><u>Go to the Wild Side</u></b>” started playing, and just then…", artist: "GLIM SPANKY", spotify: "https://open.spotify.com/search/Go%20to%20the%20Wild%20Side%20GLIM%20SPANKY" },
        // Waiting on a logo: uncomment once `image` points at one
        // { name: "Chums", type: "Apron", chapter: 1, page: 35, quote: "Hers was by <b><u>Chums</u></b>, an outdoorsy sort of brand.", image: null },
        { name: "Mizuno", type: "Baseball Glove", chapter: 1, page: 47, quote: "I put my <b><u>Mizuno</u></b> Pro glove onto my left hand.", image: "/assets/images/logos/mizuno.svg" },
        { name: "Casablanca", type: "Film", medium: "screen", by: "Michael Curtiz, 1942", chapter: 1, page: 58, quote: "“I never plan for after tonight.” “Was that supposed to be <b><u>Casablanca</u></b>?”" },
        // { name: "Sakuma Drops", type: "Candy", chapter: 1, page: 62, quote: "...like how you roll an almost-empty tin of <b><u>Sakuma Drops</u></b> candies around to see how many are left.", image: null },
        // { name: "Papico", type: "Ice Pop", chapter: 1, page: 64, quote: "The only thing that should be split up on a date is a <b><u>Papico</u></b> or Chupet popsicle—when it's a summer's day, that is!", image: null },
        { name: "Yggdrasil", type: "Album", medium: "songs", chapter: 1, page: 77, quote: "And with the note, there was an album. <b><u>Yggdrasil</u></b>, by Bump of Chicken.", artist: "BUMP OF CHICKEN", spotify: "https://open.spotify.com/search/%E3%83%A6%E3%82%B0%E3%83%89%E3%83%A9%E3%82%B7%E3%83%AB%20BUMP%20OF%20CHICKEN" },
        { name: "Bye Bye Thank You", type: "Song", medium: "songs", chapter: 1, page: 78, quote: "Not the song she had requested at all: “<b><u>Bye Bye Thank You</u></b>.” It's a song about leaving one's hometown and heading off to the big city you've always longed for.", artist: "BUMP OF CHICKEN", spotify: "https://open.spotify.com/track/1GemuQICfUiJoMwn9xnmlz" },
        { name: "Kamen Rider", type: "TV Series", medium: "screen", by: "Shotaro Ishinomori / Toei", chapter: 1, page: 81, quote: "I want to be <b><u>Kamen Rider</u></b> when I grow up. I want to be a professional sports player." },
        { name: "Hansel and Gretel", type: "Fairy Tale", medium: "books", by: "Brothers Grimm", chapter: 2, page: 26, quote: "Behind us, we left a trail, like <b><u>Hansel and Gretel</u></b>." },
        { name: "Aisazu ni wa Irarenai", type: "Novel", medium: "books", by: "Yoshinaga Fujita", chapter: 2, page: 45, quote: "...reading a copy of Yoshinaga Fujita's <b><u>Aisazu ni wa Irarenai</u></b> that I'd picked up at the bookstore in front of the station..." },
        // { name: "Animate", type: "Anime Store", chapter: 2, page: 53, quote: "And there's even a special <b><u>Animate</u></b> limited-edition version!", image: null },
        // { name: "Loft", type: "Lifestyle Store", chapter: 2, page: 55, quote: "...we usually went to eat or to the <b><u>Loft</u></b> inside the department store, or MUJI...", image: null },
        { name: "Burger King", type: "Restaurant", chapter: 2, page: 56, quote: "“What about <b><u>Burger King</u></b>, then?”", image: "/assets/images/logos/burger-king.svg" },
        { name: "Hokuriku Shinkansen", type: "Bullet Train", medium: "other", by: "JR", note: "The bullet train line along the Sea of Japan coast. It finally reached Fukui in March 2024, when it was extended from Kanazawa to Tsuruga.", chapter: 3, page: 1, quote: "A few years from now, it seems they'll extend the <b><u>Hokuriku Shinkansen</u></b> line, but as of right now, the Shinkansen still doesn't go through Fukui." },
        { name: "Yoshinoya", type: "Restaurant", chapter: 3, page: 16, quote: "There was a <b><u>Yoshinoya</u></b> and a Matsuya almost right next to each other, both fast-food beef bowl joints...", image: "/assets/images/logos/yoshinoya.svg" },
        { name: "Matsuya", type: "Restaurant", chapter: 3, page: 16, quote: "There was a Yoshinoya and a <b><u>Matsuya</u></b> almost right next to each other, both fast-food beef bowl joints...", image: "/assets/images/logos/matsuya.svg" },
        // { name: "Hidakaya", type: "Restaurant", chapter: 3, page: 16, quote: "“Asuka, what's this <b><u>Hidakaya</u></b> place? Is it a ramen shop? Chinese food?”", image: null },
        { name: "7-Eleven", type: "Convenience Store", chapter: 3, page: 17, quote: "There's a <b><u>7-Eleven</u></b> right here—and then another one just over there.", image: "/assets/images/logos/seven-eleven.svg" },
        { name: "American Graffiti", type: "Film", medium: "screen", by: "George Lucas, 1973", chapter: 3, page: 18, quote: "...the kind of thing you'd expect to see on girls who appeared in old movies, like <b><u>American Graffiti</u></b> and Back to the Future." },
        { name: "Back to the Future", type: "Film", medium: "screen", by: "Robert Zemeckis, 1985", chapter: 3, page: 18, quote: "...girls who appeared in old movies, like American Graffiti and <b><u>Back to the Future</u></b>." },
        { name: "Humphrey Bogart", type: "Actor", medium: "other", by: "Casablanca", note: "The star of Casablanca: the trench-coated hero who lets the woman he loves leave without him.", chapter: 3, page: 19, quote: "“I'll make you look just like <b><u>Humphrey Bogart</u></b> in Casablanca.”" },
        { name: "Jinbocho", type: "Neighborhood", medium: "other", by: "Tokyo", note: "Tokyo's book town: streets lined with well over a hundred secondhand and specialist bookshops, plus many publishers' offices.", chapter: 3, page: 26, quote: "Asuka said she wanted to go to <b><u>Jinbocho</u></b>." },
        { name: "Kinokuniya", type: "Bookstore", chapter: 3, page: 40, quote: "...she said she wanted to see the <b><u>Kinokuniya</u></b> bookstore...", image: "/assets/images/logos/kinokuniya.png" },
        { name: "Isetan", type: "Department Store", chapter: 3, page: 43, quote: "We went into the <b><u>Isetan</u></b> department store, a respite from feeling out of place...", image: "/assets/images/logos/isetan.svg" },
        { name: "Marui", type: "Department Store", chapter: 3, page: 43, quote: "...it turns out that while it's spelled Oi Oi, you actually pronounce it <b><u>Marui</u></b>.", image: "/assets/images/logos/marui.png" },
        // { name: "Tokyo Banana", type: "Snack", chapter: 3, page: 49, quote: "“How about I bring you some <b><u>Tokyo Banana</u></b> souvenir snack cakes, and we call it even?”", image: null },
        { name: "Studio Alta", type: "Landmark", medium: "other", by: "Shinjuku, Tokyo", note: "The building at Shinjuku Station's east exit, whose giant screen and front plaza made it one of Tokyo's classic meeting spots.", chapter: 3, page: 50, quote: "...we sat down in the plaza in front of the <b><u>Alta</u></b>, and I started looking up business hotels in the area..." },
        // { name: "Don Quijote", type: "Discount Store", chapter: 3, page: 51, quote: "...and then there was a big <b><u>Don Quixote</u></b> store.", image: null },
        { name: "Kabukicho Godzilla", type: "Landmark", medium: "other", by: "Shinjuku, Tokyo", note: "A life-size Godzilla head peering over the top of the Shinjuku Toho Building in Kabukicho, which houses a cinema and a hotel.", chapter: 3, page: 53, quote: "From this distance, I could see what looked like <b><u>Godzilla</u></b> perched on the top of the building. It was probably a movie theater." },
        // { name: "FamilyMart", type: "Convenience Store", chapter: 3, page: 54, quote: "I'd actually just spotted a building with a <b><u>Family Mart</u></b> up ahead.", image: null },
        { name: "Tojinbo", type: "Landmark", medium: "other", by: "Fukui coast", note: "Fukui's famous basalt cliffs on the Sea of Japan. In the series, threatening to throw someone off them is a running joke.", chapter: 3, page: 56, quote: "“All right! I'm going to go dispose of his body on the cliffs of <b><u>Tojimbo</u></b>.”" },
        // { name: "Pocky", type: "Snack", chapter: "sidestory", page: 10, quote: "“Hey, gimme some <b><u>Pocky</u></b>.”", image: null },
      ]
    },
    {
      volume: 4,
      chapters: {
        prologue: "The Night Sky I Sought",
        1: "Barefoot and Ponytailed in the Pool After School",
        2: "Pouting Orihime and Crying Hikoboshi",
        3: "Light a Fire in My Heart",
        4: "The Sun's Smile",
        epilogue: "The Blue Sky I Found",
      },
      items: [
        { name: "Inter-High", type: "Tournament", medium: "other", by: "High school sports", note: "The All-Japan High School Athletic Meet: every summer's national championships for high school sports clubs.", chapter: 1, page: 5, quote: "Haru's last remark was probably in reference to the <b><u>Inter-High</u></b> preliminaries held last month." },
        { name: "No-Hitter, No-Run", type: "Song", medium: "songs", chapter: 1, page: 60, quote: "You're like that Bump of Chicken song, ‘<b><u>No-Hitter, No-Run</u></b>,’” Asuka said.", artist: "BUMP OF CHICKEN", spotify: "https://open.spotify.com/track/7xU7fUw9jn27IAQgdzu9ws" },
        { name: "Blue Hawaii", type: "Shaved Ice Flavor", medium: "other", by: "Summer festivals", note: "A bright blue shaved-ice syrup, a fixture of Japanese summer festival stalls.", chapter: 1, page: 71, quote: "...reflecting the cool, glittering light like <b><u>Blue Hawaii</u></b>–flavored shaved ice." },
        // Waiting on a logo: uncomment once `image` points at one
        // { name: "Seibu", type: "Department Store", chapter: 2, page: 8, quote: "...we strolled around the <b><u>Seibu</u></b> department store in front of the station (west exit side)...", image: null },
        { name: "AOSSA", type: "Landmark", medium: "other", by: "Fukui Station", note: "The shopping and civic complex at Fukui Station's east exit. Its name is Fukui dialect for “let's meet.”", chapter: 2, page: 8, quote: "By the way, <b><u>AOSSA</u></b> is supposed to be derived from the saying “Aossa,” the Fukui dialect for “Let's meet.”" },
        { name: "Happiring", type: "Landmark", medium: "other", by: "Fukui Station", note: "The commercial building at Fukui Station's west exit, with an open plaza out front.", chapter: 2, page: 9, quote: "...we sat down at the seating area they had out in front of the <b><u>Happiring</u></b> commercial building." },
        { name: "Paris Fashion Week", type: "Fashion Event", medium: "other", by: "Paris", note: "The twice-yearly runway shows where the world's top fashion houses unveil their collections.", chapter: 2, page: 18, quote: "...she had the vibes of a model walking the runway at <b><u>Paris Fashion Week</u></b>." },
        // { name: "Takokyu", type: "Restaurant", chapter: 2, page: 40, quote: "...headed to a nearby eatery by the name of <b><u>Takokyu</u></b>.", image: null },
        { name: "Orihime and Hikoboshi", type: "Legend", medium: "other", by: "Tanabata", note: "The weaver princess and the cowherd of the Tanabata legend: lovers turned into the stars Vega and Altair, who can only meet once a year, on July 7.", chapter: 2, page: 82, quote: "“We're no <b><u>Orihime and Hikoboshi</u></b>, that's for sure.”" },
        { name: "Ultramarine", type: "Song", medium: "songs", chapter: 3, page: 10, quote: "Cider Girl's “<b><u>Ultramarine</u></b>” began to play.", artist: "Cider Girl", spotify: "https://open.spotify.com/search/%E3%82%A6%E3%83%AB%E3%83%88%E3%83%A9%E3%83%9E%E3%83%AA%E3%83%B3%20%E3%82%B5%E3%82%A4%E3%83%80%E3%83%BC%E3%82%AC%E3%83%BC%E3%83%AB" },
        // { name: "Calpico", type: "Drink", chapter: 3, page: 12, quote: "“What, like, they don't put enough water in the <b><u>Calpico</u></b> concentrate or something?”", image: null },
        { name: "NBA", type: "Basketball League", medium: "other", by: "Basketball", note: "The shortest player in NBA history was Muggsy Bogues, at 160 cm (5′3″), who played fourteen seasons.", chapter: 4, page: 58, quote: "There was an <b><u>NBA</u></b> player who was five foot two." },
      ]
    }
  ]
}

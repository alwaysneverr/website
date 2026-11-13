// Field notes: every beer drunk in "A Sister's All You Need" (Imouto Sae Ireba Ii.), as listed on the legacy beer page.
// `quote` keeps the novel's wording, with the beer itself in <b><u>. `image` is null where the old link died,
// and the page shows the fallback image instead. Images live in public/assets/images/imosae/beers/.
// `sources` lists the pages behind the note and `imageSource` where the image came from (a URL, or
// { url, label }); both show in the Sources list at the bottom of the page. Rendered by _includes/field-notes.njk.
export default {
  series: "A Sister's All You Need",
  // The cards sit inside a pint glass of beer (see _field-notes.scss)
  theme: "beer",
  volumes: [
    {
      volume: 1,
      chapters: {
        4: "The Occasional Guy Friend",
        7: "Baring All",
        10: "Valentine's Day",
      },
      items: [
        { name: "Gouden Carolus Tripel", chapter: 4, page: 50, quote: "...two Belgian beers, the <b><u>Tripel</u></b> and Christmas from Gouden Carolus.", note: "Gouden Carolus is brewed by Het Anker in Mechelen and named after Emperor Charles V (<i>Carolus</i>), who grew up in the city. The Tripel is its strong golden ale.", image: "/assets/images/imosae/beers/gouden-carolus-tripel.jpg", sources: ["https://en.wikipedia.org/wiki/Het_Anker_Brewery"] },
        { name: "Gouden Carolus Christmas", chapter: 4, page: 50, quote: "...two Belgian beers, the Tripel and <b><u>Christmas</u></b> from Gouden Carolus.", note: "10.5% ABV, brewed every August with three kinds of hops and six herbs and spices so it's ready by winter. Het Anker brought its Christmas beer back in 2002 after more than 35 years without one.", image: "/assets/images/imosae/beers/gouden-carolus-christmas.webp", sources: ["https://beercartel.com.au/gouden-carolus-christmas-ale-330ml-bottle"], imageSource: "https://images.alko.fi/images/cs_srgb,f_auto,t_medium/cdn/786844/gouden-carolus-christmas.jpg" },
        { name: "Orion Southern Star", chapter: 7, page: 81, quote: "From the Nangoku Chuhai to the <b><u>Orion Southern Star</u></b>...", note: "Orion sold Southern Star as a happoshu, a low-malt drink taxed less than beer. Once Japan's October 2026 tax change put beer and happoshu on one rate, it was relaunched as a full beer on 14 October 2026.", image: "/assets/images/imosae/beers/orion-southern-star.webp", sources: ["https://www.haveagood-holiday.com/en/articles/orion-beer-southern-star-mugi-shokunin-relaunch","https://ryukyushimpo.jp/economics/entry-5529027.html"], imageSource: "https://mhksg2020.blob.core.windows.net/cmsstorage/sogo/media/freshmart/wine/90200001-90300000/90278405.jpg" },
        { name: "Orion Special X", chapter: 7, page: 81, quote: "..the Orion Southern Star and <b><u>Special X</u></b> beers,...", note: "Technically not a beer: Special X is a \"third beer\", a cheaper beer-like drink that's legally a sparkling liqueur. It launched in 2010, was strengthened to 6% in 2012, and is sold in Okinawa and the Amami Islands.", image: "/assets/images/imosae/beers/orion-special-x.webp", sources: ["https://www.nikkei.com/article/DGXNASJC12010_S0A710C1LXA000/","https://www.orionbeer.co.jp/utility/history/h2012/0720.html"], imageSource: "https://image.entabe.jp/upload/201607/images/01_4.jpg" },
        { name: "Sankt Gallen Imperial Chocolate Stout", chapter: 10, page: 109, quote: "It was the <b><u>Imperial Chocolate Stout</u></b> from the Sankt Gallen Brewery...", note: "One of Sankt Gallen's Valentine's beers, on sale from January for a limited time each year. Roughly 9% ABV (some listings say 8.6%).", image: "/assets/images/imosae/beers/sankt-gallen-imperial-chocolate-stout.webp", sources: ["https://beertengoku.com/?p=2812"], imageSource: "https://en.momoncojp.com/wp-content/uploads/2017/09/SanktGallen_ImperialChocolateStout.png" },
        { name: "Sankt Gallen Sweet Vanilla Stout", chapter: 10, page: 112, quote: "The second one was another Sankt Gallen special, a <b><u>Sweet Vanilla Stout</u></b>.", note: "Brewed all year with real vanilla, at 6.5% ABV. The vanilla makes it a happoshu under Japanese law rather than a beer.", image: "/assets/images/imosae/beers/sankt-gallen-sweet-vanilla-stout.webp", sources: ["https://beertengoku.com/2014/08/29/sweet-vanilla-stout-sankt-gallen/"], imageSource: "https://en.momoncojp.com/wp-content/uploads/2017/09/SanktGallen_SweetVanillaStout.png" },
        { name: "Winterkoninkske", chapter: 10, page: 113, quote: "...for further inspiration—Gouden Carolus Christmas and <b><u>Winterkoninkske</u></b>,...", note: "Now sold as Winterbinkske. In September 2022 Brouwerij De Ranke took over brewing Kerkom's beers, and this 8.3% winter ale got a small rebrand and a touch of juniper. <i>Winterkoninkje</i> is Dutch for the wren, literally \"little winter king\".", image: "/assets/images/imosae/beers/winterkoninkske.webp", sources: ["https://beercollector.com.au/beers/winterbinkske","https://www.vrt.be/vrtnws/nl/2022/08/31/west-vlaamse-brouwerij-de-ranke-gaat-de-bieren-van-brouwerij-ker/"], imageSource: "https://belgiancraftbeers.com/wp-content/uploads/2020/10/Winterkoninkske-768x768.png.webp" }
      ]
    },
    {
      volume: 2,
      chapters: {
        2: "Cat & Chocolate: Blooming Days",
        9: "The Usual Sort of Ending",
        11: "It Happens, Man: Anime Adaptation 101",
      },
      items: [
        { name: "Lindemans Framboise", chapter: 2, page: 20, quote: "...and took out a bottle of <b><u>Lindemans Framboise</u></b> and some root beer...", note: "A raspberry lambic at 2.5% ABV. Lindemans is a family brewery, founded in 1822 on a farm in Vlezenbeek, just outside Brussels.", image: "/assets/images/imosae/beers/lindemans-framboise.webp", sources: ["https://en.wikipedia.org/wiki/Lindemans_Brewery"], imageSource: "https://merchantduvin.com/wp-content/uploads/2021/09/lindemans_framboise_12z_website_2022.png" },
        { name: "Edelweiss Weissbier Snowfresh", chapter: 9, page: 105, quote: "The beer was an <b><u>Edelweiss Weissbier Snowfresh</u></b>...", note: "A 5% wheat beer flavoured with alpine herbs, from Hofbräu Kaltenhausen near Salzburg, a brewery founded in 1475.", image: "/assets/images/imosae/beers/edelweiss-weissbier-snowfresh.webp", sources: ["https://beertasting.com/en/beers/hofbrau-kaltenhausen-edelweiss-snowfresh"] },
        { name: "Bink Bloesem", chapter: 9, page: 107, quote: "...pulling out a <b><u>Bink Bloesem</u></b>. The label had some cherry blossoms on it...", note: "7.1% ABV, made with honey from Sint-Truiden and pear syrup. Brouwerij Kerkom's beers have been brewed by De Ranke since 2022.", image: "/assets/images/imosae/beers/bink-bloesem.webp", sources: ["https://www.belgianbeerheaven.com/be/en/products/bink-bloesem-33cl","https://www.vrt.be/vrtnws/nl/2022/08/31/west-vlaamse-brouwerij-de-ranke-gaat-de-bieren-van-brouwerij-ker/"], imageSource: "https://belgianbeertraders.com/wp-content/uploads/2018/02/Bink-Bloesem-33cl.jpg" },
        { name: "Gouden Carolus Cuvée van de Keizer Red", chapter: 11, page: 150, quote: "His first selection from the fridge was <b><u>Gouden Carolus Cuvée van de Keizer Red</u></b>.", note: "\"Red\" (<i>Rood</i>) is the colour of the label, not the beer: it's a 10% strong blond, now sold as Imperial Blond. It's brewed each year starting on 24 February, Charles V's birthday.", image: "/assets/images/imosae/beers/gouden-carolus-cuvee-van-de-keizer-red.webp", sources: ["https://www.marinamarket.com/beverages/beer-wine/beer/gouden-carolus-imperial-blond-750ml/","https://www.beercartel.com.au/gouden-carolus-cuvee-van-de-keizer-rood-red"], imageSource: "https://img.saveur-biere.com/img/p/2674-53578.jpg" }
      ]
    },
    {
      volume: 3,
      chapters: {
        5: "Age Twenty-One",
        11: "I Wanna Be The Protagonist",
      },      
      items: [
        { name: "Lindemans Kriek", chapter: 5, page: 54, quote: "This was <b><u>Lindemans Kriek</u></b>, a beer made with wild yeast found only in a certain part of Belgium...", note: "A cherry lambic, usually listed at 3.5% ABV (some listings say 4%).", image: "/assets/images/imosae/beers/lindemans-kriek.webp", sources: ["https://en.wikipedia.org/wiki/Lindemans_Brewery"], imageSource: "https://www.thebelgianbeercompany.com/wp-content/uploads/2018/08/Lindemans-Kriek-37cl.jpg" },
        { name: "Boon Kriek/Kriek Boon", chapter: 5, page: 55, quote: "This one's called <b><u>Boon Kriek</u></b>. Give it a shot,...", note: "From Brouwerij Boon in Lembeek, the village said to have given lambic its name. Boon traces its roots to a farm brewery there in 1680.", image: "/assets/images/imosae/beers/boon-kriek.webp", sources: ["https://en.wikipedia.org/wiki/Boon_Brewery"], imageSource: {"url":"https://web.archive.org/web/2024/https://boon.be/media/pages/onze-bieren/fruitbieren/399944c7ae-1648557370/product-kriekboon.png","label":"boon.be, via the Internet Archive"} },
        { name: "Franziskaner Hefe-Weissbier", chapter: 11, page: 109, quote: "Tonight, they were having <b><u>Franziskaner Hefe-Weissbier</u></b>, featuring unfiltered yeast...", note: "Sold as Franziskaner Hefe-Weissbier since 1974; some markets now label it Weissbier Naturtrüb. The brewery's first wheat beer, in 1964, was called Spaten Champagner Weissbier.", image: "/assets/images/imosae/beers/franziskaner-hefe-weissbier.webp", sources: ["https://www.vinmonopolet.no/p/3254002","https://en.wikipedia.org/wiki/Spaten-Franziskaner-Bräu"], imageSource: "https://jimscellars.com.au/cdn/shop/products/franzi_1024x1024.jpg?v=1577953038" },
        { name: "Weihenstephaner Vitus", chapter: 11, page: 122, quote: "He was having a <b><u>Weihenstephaner Vitus</u></b>, another light-colored beer like the Franziskaner before.", note: "A 7.7% weizenbock. It was named World's Best Beer at the 2011 World Beer Awards and won gold at the 2026 World Beer Cup.", image: "/assets/images/imosae/beers/weihenstephaner-vitus.webp", sources: ["https://www.worldbeerawards.com/winner-beer/beer/2011/worlds-best-beer-world-beer-awards-2011","https://www.weihenstephaner.com/news/gold-and-silver-at-the-world-beer-cup-2026"], imageSource: "https://www.missionliquor.com/cdn/shop/files/Weihenstephaner-Vitus-500ml_600x.jpg?v=1683920691" }
      ]
    },
    {
      volume: 4,
      chapters: {
        2: "June 6",
        7: "My Little Sister Can't Be Cute (At All)",
        10: "The Omen",
      },
      items: [
        { name: "Gouden Carolus Cuvée van de Keizer Red", chapter: 2, page: 18, quote: "He gulped down his beer, spirits high. It was <b><u>Gouden Carolus Cuvée van de Keizer Red</u></b>...", note: "The same beer as in Volume 2: a 10% strong blond despite the name (\"Red\" is the label), now sold as Imperial Blond.", image: "/assets/images/imosae/beers/gouden-carolus-cuvee-van-de-keizer-red.webp", sources: ["https://www.marinamarket.com/beverages/beer-wine/beer/gouden-carolus-imperial-blond-750ml/","https://www.beercartel.com.au/gouden-carolus-cuvee-van-de-keizer-rood-red"], imageSource: "https://img.saveur-biere.com/img/p/2674-53578.jpg" },
        { name: "Bierblomme", chapter: 7, page: 106, quote: "So he headed downstairs and plucked a bottle of <b><u>Bierblomme</u></b> from the kitchen cabinet.", note: "Not a beer: a 40% beer brandy from Brouwerij De Ryck, distilled twice from their Special De Ryck ale and flavoured with six herbs, including orange peel and hop flowers. <i>Blomme</i> is Flemish dialect for \"flower\".", image: "/assets/images/imosae/beers/bierblomme.webp", sources: ["https://brouwerijderyck.be/en/beer-delicacies/bierblomme/"], imageSource: "https://brouwerijderyck.be/_images/beers/45.jpg" },
        { name: "Hoegaarden Original White", chapter: 10, page: 143, quote: "The beer was <b><u>Hoegaarden Original White</u></b>, a witbier with a refreshing citrus aroma to it.", note: "Witbier had died out by 1957, when Hoegaarden's last brewery closed. Pierre Celis, a local milkman, revived it there in 1966.", image: "/assets/images/imosae/beers/hoegaarden-original-white.webp", sources: ["https://www.beerandbrewing.com/dictionary/g7TuZaxEP0","https://en.wikipedia.org/wiki/Pierre_Celis"] }
      ]
    },
    {
      volume: 5,
      chapters: {
        13: "Star of the Common Man"
      },
      items: [
        { name: "Framboise Boon", chapter: 13, page: 137, quote: "...but for starters, he went with one he knew—<b><u>Framboise Boon</u></b>. This was a fruit beer aged on raspberries...", note: "5% ABV, made with 300 g of raspberries and 50 g of cherries per litre of lambic.", image: "/assets/images/imosae/beers/framboise-boon.webp", sources: ["https://boon.be/en/our-beers/fruit-beers/framboise-boon"], imageSource: {"url":"https://web.archive.org/web/2024/https://boon.be/media/pages/onze-bieren/fruitbieren/84758bcb04-1648557370/product-framboiseboon.png","label":"boon.be, via the Internet Archive"} }
      ]
    },
    {
      volume: 6,
      chapters: {
        13: "The After-Party"
      },
      items: [
        { name: "Hoegaarden Original White", chapter: 13, page: 142, quote: "Haruto ordered a <b><u>Hoegaarden Original White</u></b>; Aioi did the same.", note: "Pierre Celis later moved to Texas and brewed his witbier there as Celis White.", image: "/assets/images/imosae/beers/hoegaarden-original-white.webp", sources: ["https://www.beerandbrewing.com/dictionary/g7TuZaxEP0","https://en.wikipedia.org/wiki/Pierre_Celis"] }
      ]
    },
    {
      volume: 7,
      chapters: {
        7: "Things That Change, Things That Don't"
      },
      items: [
        { name: "Vedett Extra Blond", chapter: 7, page: 42, quote: "...and other classic, easy-on-the-palate foods Nayuta enjoyed. The beer was <b><u>Vedett Extra Blond</u></b>, a light, refreshing ale that went great with greasier foods.", note: "Brewed by Duvel Moortgat, the makers of Duvel. The novel calls it an ale, but Extra Blond is a 5.2% pilsner-style lager.", image: "/assets/images/imosae/beers/vedett-extra-blond.webp", sources: ["https://en.wikipedia.org/wiki/Duvel_Moortgat_Brewery"] }
      ]
    },
    {
      volume: 8,
      chapters: {
        9: "Prince Manwhore II"
      },
      items: [
        { name: "Liefmans Gluhkriek", chapter: 9, page: 68, quote: "He, Haruto, and Miyako were drinking <b><u>Liefmans Glühkriek</u></b>, an almost-black beer that looked like mulled wine at first glance.", note: "A cherry beer from Liefmans in Oudenaarde, spiced with cinnamon, cloves and star anise, and meant to be heated to around 60–70 °C. About 6–6.5% ABV.", image: "/assets/images/imosae/beers/liefmans-gluhkriek.webp", sources: ["https://birrapedia.com/gb/liefmans-gluhkriek/f-586b7b051603dad20cba491f"], imageSource: "https://cdn.webshopapp.com/shops/310202/files/431256840/650x750x2/liefmans-gluhkriek-75cl.jpg" }
      ]
    },
    {
      volume: 9,
      chapters: {
        4: "Next Year's Cherry Blossoms",
        19: "The White Box"
      },
      items: [
        { name: "Bieken", chapter: 4, page: 27, quote: "Ui poured beer into Haruto's glass. It was <b><u>Bieken</u></b>, a Belgian beer notable for its honey content,...", note: "8.5% ABV, from Brouwerij Boelens. <i>Bieken</i> is Sint-Niklaas dialect for \"bee\".", image: "/assets/images/imosae/beers/bieken.webp", sources: ["https://beerbuddy.be/en-eu/collections/brouwerij-boelens"], imageSource: "https://www.beersofeurope.co.uk/wp-content/uploads/2023/01/BoelensBiekenHoningbier060917.jpg" },
        { name: "Sankt Gallen Kansha no Nama Gold", chapter: 19, page: 132, quote: "...as Itsuki poured beer...into everyone's glasses. The brand was <b><u>Kansha no Nama Gold</u></b>, literally gratitude draft gold—produced by Sankt Gallen...", note: "Probably Sankt Gallen's 1.8-litre <i>isshōbin</i> gift beer: its gold version is a 5% ale with 感謝 (\"thanks\") printed on a washi-paper label.", image: "/assets/images/imosae/beers/sankt-gallen-kansha-no-nama-gold.webp", sources: ["https://www.value-press.com/pressrelease/119348"], imageSource: "https://momoncojp.com/wp-content/uploads/2017/08/SanktGallen_KanshaGold.png" }
      ]
    },
    {
      volume: 10,
      items: [
        { name: "Hoegaarden Forbidden Fruit", chapter: "Age Twenty", page: 88, quote: "...that meant she was legal to drink beginning today. The beer was <b><u>Hoegaarden Forbidden Fruit</u></b>, featuring a label modeled after Rubens's The Fall of Man that featured a nude Adam and Eve sipping beer.", note: "An 8.5% dark strong ale, <i>Verboden Vrucht</i> in Dutch. The label is based on a Rubens painting of Adam and Eve.", image: "/assets/images/imosae/beers/hoegaarden-forbidden-fruit.webp", sources: ["https://www.beercartel.com.au/hoegaarden-forbidden-fruit-verboden-vrucht"], imageSource: "https://www.beerritz.co.uk/images/ww/product/172629-mi.jpg" },
        { name: "Hoegaarden Original White", chapter: "Age Twenty", page: 88, quote: "They clinked their glasses together and took a chug. <b><u>Hoegaarden Original White</u></b> from the same brewery was a major brand in Japan...", note: "About 5% ABV, spiced with coriander and Curaçao orange peel.", image: "/assets/images/imosae/beers/hoegaarden-original-white.webp", sources: ["https://www.beerandbrewing.com/dictionary/g7TuZaxEP0","https://en.wikipedia.org/wiki/Pierre_Celis"] },
        { name: "Gouden Carolus Cuvée van de Keizer Red", chapter: "The Final Installment", page: 151, quote: "...Nayuta said, pouring some more <b><u>Gouden Carolus Cuvée van de Keizer Red</u></b> into his empty beer glass before topping off her own.", note: "Now sold as Imperial Blond. Its third appearance in the series, after Volumes 2 and 4.", image: "/assets/images/imosae/beers/gouden-carolus-cuvee-van-de-keizer-red.webp", sources: ["https://www.marinamarket.com/beverages/beer-wine/beer/gouden-carolus-imperial-blond-750ml/","https://www.beercartel.com.au/gouden-carolus-cuvee-van-de-keizer-rood-red"], imageSource: "https://img.saveur-biere.com/img/p/2674-53578.jpg" }
      ]
    },
    {
      volume: 11,
      chapters: {
        3: "The Kamakura Trip"
      },
      items: [
        { name: "Altbier", chapter: 3, page: 27, quote: "Itsuki went with an herb-infused sausage and an <b><u>altbier</u></b> (a brown, fragrant ale)...", note: "This is Shonan Beer's Alt, from Kumazawa Brewing in Chigasaki: a sake brewery since 1872 that began brewing beer in 1996. The Alt's label shows Enoshima.", image: "/assets/images/imosae/beers/altbier.webp", sources: ["https://www.bepal.net/archives/246930"], imageSource: {"url":"https://web.archive.org/web/2024/https://germanbrewers.com/files/vab/alt-hoch.jpg","label":"germanbrewers.com, via the Internet Archive"} }
      ]
    },
    {
      volume: 12,
      chapters: {
        17: "A New Love"
      },
      items: [
        { name: "Vedett Extra White", chapter: 17, page: 131, quote: "<b><u>Vedett Extra White</u></b> was a Belgian beer with a uniquely fruity, refreshing taste. It was also low in alcohol...", note: "A 4.7% witbier from Duvel Moortgat, the makers of Duvel.", image: "/assets/images/imosae/beers/vedett-extra-white.webp", sources: ["https://worldbeerawards.com/winner-beer/gold-37631-world-beer-awards-2022","https://en.wikipedia.org/wiki/Duvel_Moortgat_Brewery"], imageSource: {"url":"https://web.archive.org/web/2024/https://vedett-wp.imgix.net/sites/7338/2020/07/vedett-bottle_white.png?w=76&h=216&fit=clip&auto=format&q=60&dpr=2","label":"Vedett, via the Internet Archive"} }
      ]
    },
    {
      volume: 13,
      chapters: {
        11: "The Dark Knight",
        12: "I Love You",
        15: "A Sister's All You Need. THE MOVIE: Sisters of the Dead"
      },
      items: [
        { name: "Orval", chapter: 11, page: 95, quote: "...enjoying some preprepared food from the grocery store and a few glasses of <b><u>Orval</u></b>, a Belgian beer commonly seen in Japanese shops.", note: "A Trappist beer, about 6.2%. The trout with a ring on the label comes from the legend of Countess Mathilde, whose lost wedding ring a trout brought back from a spring. Brettanomyces yeast is added at bottling, so the beer changes as it ages.", image: "/assets/images/imosae/beers/orval.webp", sources: ["https://en.wikipedia.org/wiki/Orval_Brewery"] },
        { name: "Delirium Tremens", chapter: 12, page: 123, quote: "I'll take a <b><u>Delirium Tremens</u></b>.", note: "Huyghe's pink-elephant ale won gold at the 1998 World Beer Championships in Chicago. The novel says 9%; it's sold at 8.5% today, reportedly lowered from 9% in 2003.", image: "/assets/images/imosae/beers/delirium-tremens.webp", sources: ["https://beerwulf.com/blogs/inspiration/delirium","https://en.wikipedia.org/wiki/Huyghe_Brewery"], imageSource: "https://beerforce.sg/cdn/shop/products/e867e42cfcb86c68d0c58652f11bdf8a66619517_600x.png?v=1595587387" },
        { name: "Saison Dupont", chapter: 12, page: 124, quote: "Haruto had opted for a <b><u>Saison Dupont</u></b>. This one used a lot of hops...", note: "6.5% ABV and often called the benchmark of the saison style. <i>Men's Journal</i> named it the best beer in the world in 2005.", image: "/assets/images/imosae/beers/saison-dupont.webp", sources: ["https://www.brasserie-dupont.com/en/?p=2270"], imageSource: "https://cdn.webshopapp.com/shops/65337/files/406885197/650x750x2/saison-dupont-biologique.jpg" },
        { name: "Leffe Radieuse", chapter: 12, page: 125, quote: "Miyako sipped at her <b><u>Leffe Radieuse</u></b>—another high-ABV beer for her second pick—and sighed.", note: "8.2% ABV, also sold as Vieille Cuvée. Leffe still lists it, though some Dutch supermarkets have dropped it.", image: "/assets/images/imosae/beers/leffe-radieuse.webp", sources: ["https://leffe.com/en/beer/leffe-radieuse"], imageSource: "https://www.beerritz.co.uk/images/ww/product/170910-zi.jpg" },
        { name: "Orion", chapter: 15, page: 172, quote: "Itsuki was having a blast with his beer cocktail—an <b><u>Orion</u></b> with hibiscus extract.", note: "Orion was Okinawa's first beer company, founded in 1957; its beer is brewed in Nago.", image: "/assets/images/imosae/beers/orion.webp", sources: ["https://en.wikipedia.org/wiki/Orion_Breweries"] }
      ]
    },
    {
      volume: 14,
      chapters: {
        4: "Northward Bound"
      },
      items: [
        { name: "Lindemans Pecheresse", chapter: 4, page: 54, quote: "She was drinking <b><u>Lindemans Pêcheresse</u></b>, a fruit beer with peach juice added,...", note: "A peach lambic. The novel gives it 2.5% ABV, the same as Lindemans' Framboise; the brewery's own figure is hard to pin down.", image: "/assets/images/imosae/beers/lindemans-pecheresse.webp", sources: ["https://en.wikipedia.org/wiki/Lindemans_Brewery"], imageSource: "https://cdn.webshopapp.com/shops/65337/files/423687497/650x750x2/lindemans-pecheresse.jpg" },
        { name: "Asahi Extra Cold", chapter: 4, page: 64, quote: "Miyako shared the toast with several coworkers before downing her <b><u>Asahi Extra Cold</u></b>.", note: "Not a separate beer: it's Asahi Super Dry poured at −2 to 0 °C from a special dispenser, in bars since 2010.", image: "/assets/images/imosae/beers/asahi-extra-cold.webp", sources: ["https://gourmet.watch.impress.co.jp/docs/news/2090209.html"] }
      ]
    }
  ]
}

// set up text to print, each item in array is new line
var aText = new Array(
    "Dear Frazzle,", 
    "This letter is dedicated to you, cause how the hell did you even find this game in the first place? You've made me play too many games that I won't usually play for the past year, and I appreciate you.",
    "But again, how the hell did you find this game? The Letter is not a game that I would usually touch, or even want to play, if I know this outside of contracts. It combines two things that I don't particularly enjoy, at least not to the same level as other people... Visual Novel... and Horror.",
    "I need to remind you again that the latter is something I vehemently dislike. I'm the type of guy who would close my eyes at scary scenes in a horror movie, and in this case, I definitely did close my eyes during the multitudes of scary scenes that this VN has.",
    "The game is telling a story about a group of people who got cursed as they read a letter marred in blood saying help me more than dozens of times, and to send this letter to five people or die. The premise is as tacky as it sounds, but the game itself doesn't let that tackiness lead the dance, so to speak. It grounds itself by actually developing its character and giving us reason to care about them.",
    "It slyly does this by exploring each character's trauma, because the supernatural force behind this curse is using their own trauma against them. Sending them nightmares, whispering things, reminding them of their guilt, reminding them of their weakness. Honestly, I was genuinely surprised that by the end, I was glad that none of them dies (I checked with the guides, if I didn't do this with guides, there are real chances that some of these people would die. I don't know if that would make me seem like a coward, but I don't care.)",
    "Anyway, I only managed to complete this game through one of its endings. Looking at the branching path that the game give me, there are as much as ten endings, with variance depending on friendship points (they have this system!) for extra epilogue scenes. I'll probably come back to this game later to check some of the possible couple ending, cause there's a few of them that I'd like to see by the end... but for now, and for this bounty, I'll allow myself this happy ending where nobody dies... and the mansion where the letter was spawned is burned to crisp, as hallowed sounds of people dying filled the grounds even after there was nothing left...",
    "Thank you for contracting me this,",
    "AlwaysNever"
    );
    var iSpeed = 50; // time delay of print out
    var iIndex = 0; // start printing array at this posision
    var iArrLength = aText[0].length; // the length of the text array
    var iScrollAt = 20; // start scrolling up at this many lines
     
    var iTextPos = 0; // initialise text position
    var sContents = ''; // initialise contents variable
    var iRow; // initialise current row
     
    function typewriter()
    {
     sContents =  ' ';
     iRow = Math.max(0, iIndex-iScrollAt);
     var destination = document.getElementById("typedtext");
     
     while ( iRow < iIndex ) {
      sContents += aText[iRow++] + '<br />';
     }
     destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
     if ( iTextPos++ == iArrLength ) {
      iTextPos = 0;
      iIndex++;
      if ( iIndex != aText.length ) {
       iArrLength = aText[iIndex].length;
       setTimeout("typewriter()", 500);
      }
     } else {
      setTimeout("typewriter()", iSpeed);
     }
    }
    
    
    typewriter();
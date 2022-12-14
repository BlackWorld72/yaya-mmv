var cat
var word
var lang
var sss
var isIn = false
var book
var type
var isYaya = false

var allwords = []
var selectedCat = []

var coefyaya = [2,3,2,1.5,1.5,2,2,1.5,2,1.5,2,3,3,3]
var coefraph = [3,3,3,1.5,1.5,3,3,3,3,2,3,2,1.5,1.5,2,2,1.5,2,1.5,2,3]

var activeTranslate = -1
var translate = [["",""],["",""],["",""],["",""],["",""]]

function changeTranslation(n) {
  
  if (activeTranslate != -1) {
    translate[activeTranslate][0] = document.getElementById("intranslate").value
    translate[activeTranslate][1] = document.getElementById("outtranslate").value
  }

  activeTranslate = n
  document.getElementById("intranslate").value = translate[activeTranslate][0]
  document.getElementById("outtranslate").value = translate[activeTranslate][1]
}

function sendRequestTrad(text, inlang, outlang) {
  var req = new XMLHttpRequest()
  url = ""
  switch (activeTranslate) {
    case 0:
      url = "https://api-free.deepl.com/v2/translate?auth_key=10196129-d4d9-9602-fed2-15c0592ce4ef:fx&text=" + text + "&source_lang=" + inlang + "&target_lang=" + outlang
      break
    default:
      return
  }
  req.open("GET",url,true)
  req.send()
  req.onreadystatechange = (e) => {
    val = JSON.parse(req.responseText)
    final = ""
    console.log(val)
    switch(activeTranslate) {
      case 0:
        final = val.translations[0].text
        break
      default: 
        return
    }
    document.getElementById("outtranslate").textContent = final
  }

}

function traduit() {
  input = document.getElementById("intranslate").value
  source_lang = document.getElementById("intrad").options[document.getElementById("intrad").selectedIndex].value
  target_lang = document.getElementById("outtrad").options[document.getElementById("outtrad").selectedIndex].value
  sendRequestTrad(input, source_lang, target_lang)
}

function contain(tab, val) {
  for (let i = 0 ; i < tab.length ; i++) {
    if (tab[i] == val) {
      return i
    }
  }
  return -1
}

document.addEventListener('keydown', function(e) {
  if((e.code == "Space" || e.code == "Enter") && isIn) {
    if (isHidden(document.getElementById("btnNext"))) {
      validate()
    }
    else {
      changeSelect(false)
    }
  }
});

function isHidden(el) {
  var style = window.getComputedStyle(el);
  return (style.display === 'none')
}

function isNb(evt) {
  var theEvent = evt || window.event;
  
    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
    // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9\.\-]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

function moyenne() {
  i = 0
  moy = 0
  ang = 0
  while(true) {
    if (isYaya) {
      d = document.getElementById("note" + i)
    }
    else {
      d = document.getElementById("rnote" + i)
    }
    
    if (d == null) {
      break
    }
    if (d.value != "") {
      if (isYaya) {
        moy += (parseFloat(d.value)*coefyaya[i])
      }
      else {
        console.log(i)
        if (i < 9) {
          ang += (parseFloat(d.value)*coefraph[i])
        }
        else {
          moy += (parseFloat(d.value)*coefraph[i])
        }
      }
    }
    i+=1
  }
  if (isYaya) {
    moy = moy/30
    moy = Math.floor(moy*100)/100
    document.getElementById("moyenne").textContent = "Moyenne : " + moy
  }
  else {
    ang = ang/24
    ang = Math.floor(ang*100)/100
    
    moy = moy/24
    moy = Math.floor(moy*100)/100
    document.getElementById("moyenne").textContent = "Moyenne Anglais : " + ang + " Moyenne Allemand : " + moy
  }
}

function note(n) {
  document.getElementById("noteDiv").setAttribute("style","visibility: show; display: block;")
  if (n == 0) {
    isYaya = true
    document.getElementById("noteyaya").setAttribute("style","visibility: show; display: block;")
    document.getElementById("noteraph").setAttribute("style","display: none; visibility: hidden;")
    document.getElementById("moyenne").textContent = "Moyenne : 0"
  } else {
    isYaya = false
    document.getElementById("noteraph").setAttribute("style","visibility: show; display: block;")
    document.getElementById("noteyaya").setAttribute("style","display: none; visibility: hidden;")
    document.getElementById("moyenne").textContent = "Moyenne Anglais : 0 Moyenne Allemand : 0"
  }
}

function copyAll() {
  // Get the text field
  var copyText = document.getElementById("allan");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);
}

function createVoc() {

  nom = document.getElementById("nom").value
  if (nom == "") {
    return
  }

  mots = document.getElementById("mots").value
  if (mots == "") {
    return
  }

  selectMatiere = document.getElementById("selectMatiere").value
  if (selectMatiere == "0") {
    return
  }
  /*
  anglais_tech =
{
    "cat": [
        {
            "nom": "Les parties du corp",
            "words": [
                {
                    "fr": "t??te",
                    "al": "head"
                },
  */
 words = ""
  mots = mots.split("\n")
  for (mot in mots) {
    frw = ""
    alw = ""
    val = mots[mot].split(":")
    asasa = val[0].split("\"")
    for (let k = 0 ; k < asasa.length ; k++) {
      frw += asasa[k]
      if (k < asasa.length - 1) {
        frw += "\\\""
      }
    }
    asasa = val[1].split("\"")
    for (let k = 0 ; k < asasa.length ; k++) {
      alw += asasa[k]
      if (k < asasa.length - 1) {
        alw += "\\\""
      }
    }
    words += "\n\t\t\t\t{ \n\t\t\t\t\t\"fr\": \"" + frw + "\",\n\t\t\t\t\t\"al\": \"" + alw + "\" \n\t\t\t\t}"
    if (mot < mots.length-1) {
      words += ","
    }
  }
  //words = "\n\t\t\t\t{ \n\t\t\t\t\t\"fr\": \"t??te\",\n\t\t\t\t\t\"al\": \"head\" \n\t\t\t\t}"
  text = "\n\t\t{\n\t\t\t\"nom\": \" " + nom + "\", \n\t\t\t\"words\": [ " + words + " \n\t\t\t] \n\t\t}"

  document.getElementById("donneaallan").style = "visibility: show: display: block;"
  document.getElementById("allan").value = text
}

function listWords(data) {
  isIn = false
  qs = document.getElementById("qs")
  document.getElementById("qs").innerHTML = "";
  sss = data

  select = document.createElement("select")
  select.setAttribute("onChange", "changeSelectAllWord(this.value)")
  select.setAttribute("class", "inpanswer")

  document.getElementById("btnValid").style = "visibility: hidden; display: none;"
  document.getElementById("btnNext").style = "visibility: hidden; display: none;"
  //document.getElementById('tablevariation').setAttribute("style", "visibility: hidden; display: none;")

  let opt = document.createElement('option')
  opt.textContent = "Tout"
  opt.setAttribute("value", "all");
  select.append(opt)  

  x = document.createElement("div")
  x.setAttribute("id", "jetest")

  for (let j = 0 ; j < data.cat.length ; j++) {
    opt = document.createElement('option')
    opt.textContent = data.cat[j].nom 
    opt.setAttribute("value", j+1);
    select.append(opt)
  }

  qs.append(select)
  qs.append(x)

  changeSelectAllWord("all")
}

function changeSelectAllWord(value) {
  x = document.getElementById("jetest")
  x.innerHTML = "";

  if (value == "all") {
    for (let j = 0 ; j < sss.cat.length ; j++) {
      h2 = document.createElement("h2")
      h2.textContent = sss.cat[j].nom
      x.append(h2)
      for (let i = 0 ; i < sss.cat[j].words.length ; i++) {
        h2 = document.createElement("h3")
        h2.setAttribute("id","inpDIVAllWords")
        vava = sss.cat[j].words[i].al
        if (vava.includes("<img>")) {
          h2.textContent = sss.cat[j].words[i].fr + " > " //+ sss.cat[j].words[i].al
          idp = document.createElement("img")
          idp.src = "./img/" + vava.split(" ")[1] + ".png"
          let w = idp.naturalWidth
          let h = idp.naturalHeight
          let v = 300 * (h / w)
          idp.style = "width: 300px; height: " + v + "px;"
          h2.append(idp)
        }
        else {
          h2.textContent = sss.cat[j].words[i].fr + " > " + sss.cat[j].words[i].al
        }
        x.append(h2)
      }
    }
  }
  else {
    let j = parseInt(value)-1
    h2 = document.createElement("h2")
    h2.textContent = sss.cat[j].nom
    x.append(h2)
    for (let i = 0 ; i < sss.cat[j].words.length ; i++) { 
      h2 = document.createElement("h3")
      h2.setAttribute("id","inpDIVAllWords")
      
      vava = sss.cat[j].words[i].al
      if (vava.includes("<img>")) {
        h2.textContent = sss.cat[j].words[i].fr + " > " //+ sss.cat[j].words[i].al
        idp = document.createElement("img")
        idp.src = "./img/" + vava.split(" ")[1] + ".png"
        let w = idp.naturalWidth
        let h = idp.naturalHeight
        let v = 300 * (h / w)
        idp.style = "width: 300px; height: " + v + "px;"
        h2.append(idp)
      }
      else {
        h2.textContent = sss.cat[j].words[i].fr + " > " + sss.cat[j].words[i].al
      }
      x.append(h2)
    }
  }
}

function clearSelectStyle(select) {
  let value=1
  while (true) {
    i = document.getElementById("opt" + value)
    if (i == null) {
      return
    }
    i.setAttribute("style","background-color: #333;")
    value += 1
  }
}

function clearLitt() {
  document.getElementById("txt").innerHTML = "";
  document.getElementById("txt").setAttribute("style", "visibility: hidden;  display: none;")
}

function btnTypeLivreColor(b) {
  document.getElementById("resume").setAttribute("style", "background-color: #333;")
  document.getElementById("informations").setAttribute("style", "background-color: #333;")
  document.getElementById("livre").setAttribute("style", "background-color: #333;")

  if (b != "") {
    document.getElementById(b).setAttribute("style", "background-color: #2D7024;")
  }
}

function btnLivreColor(t, b) {
  if (t == "cm") {
    max = 3
  }
  else {
    max = 2
  }

  for (let i = 0 ; i < max ; i++) {
    document.getElementById(t + i).setAttribute("style", "background-color: #333;")
  }
  document.getElementById(t + b).setAttribute("style", "background-color: #2D7024;")
} 

function livre(chap) {
  btnTypeLivreColor("livre")

  if (document.getElementById("dlivre") != null) {
    document.getElementById("dlivre").innerHTML = ""
  }

  if (document.getElementById("selecttest") == null) {
    clearLitt()
    select = document.createElement("select")
    if (type == "cm") {
      length = livreCM.livre[book].livre.length
    }
    
    select.setAttribute("onchange","livre(this.value)")
    select.setAttribute("id","selecttest")
    o = document.createElement("option")
    o.textContent = "Introduction"
    o.value = 0
    select.append(o)
    for (let i = 0 ; i < length ; i++) {
      o = document.createElement("option")
      o.value = (i+1)
      o.textContent = "Chapitre " + (i+1)
      select.append(o)
    }
    
    document.getElementById("txt").append(select)
  }

  if (chap == 0) { // Introduction
    s = ""
    for (let i = 0 ; i < livreCM.livre[book].intro.length ; i++) {
      s += livreCM.livre[book].intro[i]
    }
    p = document.getElementById("dlivre")
    if (p == null) {
      p = document.createElement("div")
      p.setAttribute("id","dlivre")
    }

    k = document.createElement("p")
    k.textContent = s

    p.append(k)
    document.getElementById("txt").append(p)
  }
  else {
    p = document.getElementById("dlivre")
    br = document.createElement("br")
    for (let i = 0 ; i < livreCM.livre[book].livre[chap-1].length ; i++) {
      k = document.createElement("p")
      k.textContent = livreCM.livre[book].livre[chap-1][i]
      p.append(k)
      p.append(br)
    }

  }

  document.getElementById("txt").setAttribute("style", "visibility: show;  text-align: left;")
}

function informations() {
  clearLitt()
  btnTypeLivreColor("informations")
  if (type == "cm") {
    tab = [[livreCM.livre[book].auteur, "Auteur"], [livreCM.livre[book].analyse, "Analyse"], [livreCM.livre[book].style,"Style d'??criture"], [livreCM.livre[book].personnage,"Evolution du personnage"], [livreCM.livre[book].lien,"Lien avec la r??alit?? historique"]]

    for (let i = 0 ; i < tab.length ; i++) {
      if (tab[i][0] != "") {
        h = document.createElement("h3")
        h.textContent = tab[i][1]
        h.setAttribute("style", "text-decoration: underline; margin-top: 5px;")
        document.getElementById("txt").append(h)
  
        p = document.createElement("p")
        p.textContent = tab[i][0]
        document.getElementById("txt").append(p)
      }
    }

    document.getElementById("txt").setAttribute("style", "visibility: show;  text-align: left;")
  }
}

function resume() {
  clearLitt()
  btnTypeLivreColor("resume")
  if (type == "cm") {
    for (let i = 0 ; i < livreCM.livre[book].resume.length ; i++) {
      p = document.createElement("p")
      p.textContent = livreCM.livre[book].resume[i]
      document.getElementById("txt").append(p)
    } 
    document.getElementById("txt").setAttribute("style", "visibility: show;  text-align: left;")
  }
}

function choiceBook(t, b) {
  clearLitt()
  btnLivreColor(t,b)
  if (t == "cm") {
    document.getElementById("typelivre").setAttribute("style", "visibility: show;")
    book = b
    type = t
  }
  btnTypeLivreColor("")
}

function getAllWordsFromCat(id) {
  data = sss
  list = []
  for (let i = 0 ; i < data.cat[id].words.length ; i++) {
    list.push([data.cat[id].words[i].fr, data.cat[id].words[i].al])
  }
  return list
}

function changeSelect(isNew) {
  x = document.getElementById("jetest")
  x.innerHTML = "";
  data = sss
  value = document.getElementById("selecttest").value

  if (isNew) {
    if (value == "all") {
      cat = Math.floor(Math.random() * data.cat.length)
      allwords = []
      for (let i = 0 ; i < data.cat.length ; i++) {
        allwords = allwords.concat(getAllWordsFromCat(i));
      }
      selectedCat = []
      clearSelectStyle(document.getElementById("selecttest"))
    }
    else {
      tmp = contain(selectedCat, parseInt(value)-1)
      if (tmp == -1) { // Not selected
        selectedCat.push(parseInt(value)-1)
        document.getElementById("opt" + value).setAttribute("style", "background-color: green;")
      }
      else { //already selected
        selectedCat.splice(tmp, 1)
        document.getElementById("opt" + value).setAttribute("style","background-color: #333;")
      }
      cat = selectedCat[Math.floor(Math.random() * selectedCat.length)]
      allwords = []
      for (let i = 0 ; i < selectedCat.length ; i++) {
        allwords = allwords.concat(getAllWordsFromCat(selectedCat[i]));
      }
    }
  }
  else {
    if (value == "all") {
      cat = Math.floor(Math.random() * data.cat.length)
    }
    else {
      cat = selectedCat[Math.floor(Math.random() * selectedCat.length)] 
    }
  }

  word = Math.floor(Math.random() * allwords.length)
  lang = Math.floor(Math.random() * 2)

  h2 = document.createElement("h3")
  h2.setAttribute("id","inpDIV")

  if (lang == 1) {
    h2.textContent = allwords[word][0]
  }
  else {
    vava = allwords[word][1]
    if (vava.includes("<img>")) {
      idp = document.createElement("img")
      idp.src = "./img/" + vava.split(" ")[1] + ".png"
      let w = idp.naturalWidth
      let h = idp.naturalHeight
      let v = 300 * (h / w)
      idp.style = "width: 300px; height: " + v + "px;"
      h2.append(idp)
    }
    else {
      h2.textContent = allwords[word][1]
    }
  }
  x.append(h2)

  document.getElementById("btnNext").setAttribute("style", "visibility: hidden; display: none;")
  document.getElementById("btnValid").setAttribute("style", "visibility: show;")
  //document.getElementById('tablevariation').setAttribute("style", "visibility: hidden; display: none;")
}

function validate() {

  x = document.getElementById("inpDIV")
  x.append(document.createElement("br"))
  h2 = document.createElement("span")
  h2.setAttribute("style","color: green;")

  if (lang == 1) {
    vava = allwords[word][1]
    if (vava.includes("<img>")) {
      idp = document.createElement("img")
      idp.src = "./img/" + vava.split(" ")[1] + ".png"
      let w = idp.naturalWidth
      let h = idp.naturalHeight
      let v = 300 * (h / w)
      idp.style = "width: 300px; height: " + v + "px;"
      h2.append(idp)
    }
    else {
      h2.textContent = allwords[word][1]
    }
  }
  else {
    h2.textContent = allwords[word][0]
  }

  x.append(h2)

  document.getElementById("btnValid").setAttribute("style", "visibility: hidden; display: none;")
  document.getElementById("btnNext").setAttribute("style", "visibility: show;")
  //document.getElementById('tablevariation').setAttribute("style", "visibility: hidden; display: none;")
}

function question(data) {
  isIn = true
  qs = document.getElementById("qs")
  document.getElementById("qs").innerHTML = "";

  sss = data

  select = document.createElement("select")
  select.setAttribute("onchange", "changeSelect(true)")
  select.setAttribute("id", "selecttest")
  select.setAttribute("class", "inpanswer")

  let opt = document.createElement('option')
  opt.textContent = "Tout"
  opt.setAttribute("value", "all");
  select.append(opt)  

  x = document.createElement("div")
  x.setAttribute("id", "jetest")

  for (let j = 0 ; j < data.cat.length ; j++) {
    opt = document.createElement('option')
    opt.textContent = data.cat[j].nom
    opt.setAttribute("value", j+1);
    opt.setAttribute("id", "opt" + (j+1))
    select.append(opt)
  }

  qs.append(select)
  qs.append(x)

  document.getElementById("btnNext").setAttribute("style", "visibility: hidden; display: none;")
  //document.getElementById('tablevariation').setAttribute("style", "visibility: hidden; display: none;")
  document.getElementById("btnValid").setAttribute("style", "visibility: show;")
  document.getElementById("btnValid").focus()

  changeSelect(true)
}


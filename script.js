uploadImgButton = document.querySelector(".uploadImg")
fileInput = document.querySelector(".fileInput")
previewImage = document.querySelector(".imageContainer img")
filters = document.querySelectorAll(".filter button")
filterName = document.querySelector(".filterInfo .title")
filterValue = document.querySelector(".filterInfo .value")
filterRange = document.querySelector(".slider input")
rotateOption = document.querySelectorAll(".rotate button")
resetButton = document.querySelector(".resetFilter")
saveButton = document.querySelector(".saveImg")

let brightness = 100;
let saturation = 100;
let inversion = 0;
let grayscale = 0;
let rotate = 0;
let flipHorizontal = 1;
let flipVertical = 1;


function applyFilters() {
 previewImage.style.filter = `brightness(${brightness}%)
 saturate(${saturation}%)
 invert(${inversion}%)
 grayscale(${grayscale}%)
 `
 previewImage.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`
}

function fileInputHandler() {
 const file = fileInput.files[0];
 
 if (!file) return
 
 previewImage.src = URL.createObjectURL(file);
 previewImage.addEventListener("load", () => {
  document.querySelectorAll(".disabled")
    .forEach(e => e.classList.remove("disabled"))
 })
}

function rangeHandler() {
 filterValue.innerText = `${filterRange.value}%`
 
 const selectedFilter = document.querySelector(".filter .activeBtn")
 
 switch (selectedFilter.id) {
  case "brightness":
   brightness = filterRange.value
   break
  case "grayscale":
   grayscale = filterRange.value
   break
  case "inversion":
   inversion = filterRange.value
   break
  case "saturation":
   saturation = filterRange.value
   break
 }
 
 applyFilters()
}

filters.forEach(el => {
 el.addEventListener("click", () => {
  document.querySelector(".filter .activeBtn").classList.remove("activeBtn")
  el.classList.add("activeBtn")
  filterName.innerText = el.innerText
  
  switch (el.id) {
   case "brightness":
    filterRange.max = 200;
    filterRange.value = brightness
    filterValue.innerText = `${brightness}%`
    break
   case "grayscale":
    filterRange.max = 100;
    filterRange.value = grayscale
    filterValue.innerText = `${grayscale}%`
    break
   case "inversion":
    filterRange.max = 100;
    filterRange.value = inversion
    filterValue.innerText = `${inversion}%`
    break
   case "saturation":
    filterRange.max = 200;
    filterRange.value = saturation
    filterValue.innerText = `${saturation}%`
    break
  }
 })
})


rotateOption.forEach(el => {
 el.addEventListener("click", () => {
  switch (el.id) {
   case "left":
    rotate -= 90;
    break
   case "right":
    rotate += 90;
    break
   case "vertical":
    flipVertical = flipVertical === 1 ? -1 : 1;
    break
   case "horizontal":
    flipHorizontal = flipHorizontal === 1 ? -1 : 1;
    break
  }
  
  applyFilters()
  
 })
})

function resetFilter() {
 brightness = 100;
 saturation = 100;
 inversion = 0;
 grayscale = 0;
 rotate = 0;
 flipHorizontal = 1;
 flipVertical = 1;
 filters[0].click();
 applyFilters();
 
 
}

function saveImage() {
 const canvas = document.createElement("canvas")
 const ctx = canvas.getContext("2d")
 canvas.width = previewImage.naturalWidth
 canvas.height = previewImage.naturalHeight
 
 ctx.filter = `brightness(${brightness}%)
 saturate(${saturation}%)
 invert(${inversion}%)
 grayscale(${grayscale}%)
 `
 ctx.translate(canvas.width / 2, canvas.height / 2)
 
 if (rotate !== 0) {
  ctx.rotate(rotate * Math.PI / 180)
 }
 
 ctx.scale(flipHorizontal, flipVertical)
 ctx.drawImage(previewImage, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height)
 
 const link = document.createElement("a")
 link.download = "edited_image.jpg"
 link.href = canvas.toDataURL()
 link.click()
}

uploadImgButton.addEventListener("click", () => fileInput.click())
fileInput.addEventListener("change", fileInputHandler)
filterRange.addEventListener("input", rangeHandler)
resetButton.addEventListener("click", resetFilter)
saveButton.addEventListener("click", saveImage)

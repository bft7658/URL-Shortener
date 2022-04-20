function myFunction() {
  /* Get the text field */
  let copyText = document.getElementById("copyUrl")

  /* Select the text field */
  copyText.select()
  copyText.setSelectionRange(0, 99999) /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value)

  /* Alert the copied text */
  alert(`Copied the URL : \n\n${copyText.value}`)
}



// 看 W3 School 的另一種範例嘗試，但是失敗
// function myFunction() {
//   let copyText = document.getElementById("copyUrl")
//   copyText.select()
//   copyText.setSelectionRange(0, 99999)
//   navigator.clipboard.writeText(copyText.value);

//   let tooltip = document.getElementById("myTooltip")
//   tooltip.innerHTML = "Copied: " + copyText.value;
// }

// function outFunc() {
//   let tooltip = document.getElementById("myTooltip");
//   tooltip.innerHTML = "Copy to clipboard";
// }
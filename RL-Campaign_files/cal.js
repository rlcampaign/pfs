let rowCount = 1;
function addRow() {
rowCount++;
const table = document.getElementById("rowTable");
const row = document.createElement("tr");

const priceCell = document.createElement("td");
const priceInput = document.createElement("input");
priceInput.type = "currency";
priceInput.name = "price" + rowCount;
priceInput.onchange = calculatePrice;

priceCell.appendChild(priceInput);

const discountCell = document.createElement("td");
const discountSelect = document.createElement("select");
discountSelect.name = "discount" + rowCount;
discountSelect.onchange= calculatePrice;
const discounts = ["0", 10, 20, 30, 40, 50, 60, 70];
discounts.forEach((discount) => {
const option = document.createElement("option");
option.value = discount;
option.text = discount + "%";
discountSelect.appendChild(option);
});
discountCell.appendChild(discountSelect);

row.appendChild(priceCell);
row.appendChild(discountCell);
table.appendChild(row);
}

function calculateTotal() {
const table = document.getElementById("rowTable");
const rows = table.getElementsByTagName("tr");
let totalPrice = 0;
let noDscTotalPrice = 0;

for (let i = 1; i < rows.length; i++) {
const row = rows[i];
const priceInput = row.getElementsByTagName("input")[0];
const discountSelect = row.getElementsByTagName("select")[0];
const price = parseFloat(priceInput.value);
const discount = parseInt(discountSelect.value);

if (!isNaN(price)) {
noDscTotalPrice += price;
const discountedPrice = Math.ceil(price * (1 - discount/ 100)) ;
totalPrice += discountedPrice;
}
}

//const totalPriceElement = document.getElementById("totalPrice");
//totalPriceElement.textContent = "Total Price: $" + totalPrice.toFixed(2);

}


function hankaku2Zenkaku(str) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}

function calculatePrice() {
	var dscLMP = 0;
	var dscBuy3 = 0;
	var label = document.getElementById("final-price");
	label.innerHTML = "";
	var noDsclabel = document.getElementById("TagPriceNoDsc");
	noDsclabel.innerHTML = "";
	
	const table = document.getElementById("rowTable");
	const rows = table.getElementsByTagName("tr");
	let noDscTotalPrice = 0;
	let totalPrice = 0;
	let countProduct = 0;
	for (let i = 1; i < rows.length; i++) {
		const row = rows[i];
		const priceInput = row.getElementsByTagName("input")[0];
		const discountSelect = row.getElementsByTagName("select")[0];


		var stringPrice = priceInput.value;
		stringPrice = hankaku2Zenkaku(stringPrice);
		const price = parseFloat(stringPrice.replace(/[^0-9.-]+/g,""));
		const discount = parseInt(discountSelect.value);

		if (!isNaN(price)) {
		noDscTotalPrice += price;
		priceInput.value = price.toLocaleString("ja-JP", {style:"currency", currency:"JPY"});
		const discountedPrice = Math.ceil(price * (1 - discount/ 100));
		totalPrice += discountedPrice;
		countProduct +=1;
		}
	}
	
	if (countProduct < 3) {
		document.getElementById("myCheck20").checked = false;
		document.getElementById("myCheck20").disabled = true;
	}
	else{
	    document.getElementById("myCheck20").disabled = false;
	}
	
	if (document.getElementById("myCheck3").checked) {
	      //alert("チェックボックスがonに変更されました。");
	      dscLMP = parseFloat(document.getElementById("myCheck3").value);
	} else{
			dscLMP = 0;
	}

	if (document.getElementById("myCheck20").checked) {
	      //alert("チェックボックスがonに変更されました。");
	      dscBuy3 = parseFloat(document.getElementById("myCheck20").value);
	} else{
			dscBuy3 = 0;
	}

noDsclabel.innerHTML = noDscTotalPrice.toLocaleString("ja-JP", {style:"currency", currency:"JPY"});
// Calculate final price
var finalPrice = Math.ceil(totalPrice * (1 - dscBuy3/100));
	finalPrice = Math.ceil(finalPrice * (1 - dscLMP/100));
	//finalPrice = finalPrice * 1.1;
// Update label with animation

var anim = setInterval(function() {
label.innerHTML = (Math.round(finalPrice * 100) / 100).toLocaleString("ja-JP", {style:"currency", currency:"JPY"});
label.style.animation = "countup 0.5s";
clearInterval(anim);
}, 500);
}

function changeLanguage() {
const languageSelect = document.getElementById("language");
const language = languageSelect.value;

if (language === "en") {
document.getElementById("TagPriceTit").textContent = "❈Tag Price (Include Tax)";
document.getElementById("PrcDscTit").textContent = "❈Discount %";
document.getElementById("AddTit").textContent = "Add Product";
document.getElementById("DiscTit").textContent = "Total Price(tax inc)";
document.getElementById("languagetit").textContent = "Language：";
document.getElementById("DiscExpl1").textContent = "❈This is a reference price.";
document.getElementById("DiscExpl2").textContent = "❈Please check the final price at the cash register.";
document.getElementById("TagPriceNoDscTit").textContent = "No Discount Total Price(tax inc):";

} else if (language === "ja") {
document.getElementById("TagPriceTit").textContent = "❈タグの価格(税込)";
document.getElementById("PrcDscTit").textContent = "❈店内割引表示";
document.getElementById("AddTit").textContent = "商品追加";
document.getElementById("DiscTit").textContent = "合計価格(税込)";
document.getElementById("languagetit").textContent = "言語：";
document.getElementById("DiscExpl1").textContent = "❈こちらは参考価格となります。";
document.getElementById("DiscExpl2").textContent = "❈最終価格についてはレジにてご確認ください。";
document.getElementById("TagPriceNoDscTit").textContent = "割引なし合計価格（税込）:";


} else if (language === "zh") {
document.getElementById("TagPriceTit").textContent = "❈标签价格（含税）";
document.getElementById("PrcDscTit").textContent = "❈店内折扣标识";
document.getElementById("AddTit").textContent = "添加产品";
document.getElementById("DiscTit").textContent = "合计价格(含税)";
document.getElementById("languagetit").textContent = "语言：";
document.getElementById("DiscExpl1").textContent = "❈这是参考价格。";
document.getElementById("DiscExpl2").textContent = "❈最终价格请到收银台确认。";
document.getElementById("TagPriceNoDscTit").textContent = "不含折扣总价（含税）:";

}
}
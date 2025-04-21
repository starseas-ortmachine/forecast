let cityForecast = "";
let cityNumber = {"釧路":304,"旭川":302,"札幌":306,"青森":308,"秋田":309,"仙台":312,
    "新潟":323,"金沢":325,"東京":319,"宇都宮":316,"長野":322,"名古屋":329,
    "大阪":331,"高松":341,"松江":337,"広島":338,"高知":344,"福岡":346,"鹿児島":352,
    "奄美":352,"那覇":353,"石垣":356
};
const wetherAPI = fetch("https://www.jma.go.jp/bosai/common/const/area.json");

document.getElementById('getcity').addEventListener('submit', function(event) {
    event.preventDefault();

    const city = document.getElementById('inputCity').value;
    if (!city) {
        
        document.getElementById('result').innerHTML = "都市名を入力してください。";
        return;
     }
    // if (city) {
    //     document.getElementById('result').innerHTML = "good";
    // }
    
    getForecast(city);
    
    // document.getElementById('result').innerHTML = "" 
});

async function getForecast(city) {
    try {
        //都市コードを取得
        let targetCity = cityNumber[city];

        const resultDiv = document.getElementById('result')
        // APIリクエスト
        const response = await fetch("https://api.aoikujira.com/tenki/week.php?fmt=json&city="+targetCity);

        if (!response.ok) {
            throw new Error("データの取得に失敗しました。");
        }
        
        // 結果をクリア
        resultDiv.innerHTML = "データを取得中...";

        const data = await response.json();

        const date = data[targetCity].map(obj => obj.date);
        const forecast = data[targetCity].map(obj => obj.forecast); 
        cityForecast = "\n" + city + "の天気予報<br>";
        for (i=0; i<forecast.length; i++) {
            cityForecast = cityForecast + date[i] + "の天気は" + 
                            forecast[i] + "と予想されます。\n";
        }
        // 結果を表示
        // return typeof cityForecast.replace(/\n/g, "<br>");
        resultDiv.innerHTML = cityForecast.replace(/\n/g, "<br>");

    } catch (error) {
        return "エラーが発生しました\n" + error.message;
        // resultDiv.innerHTML = `エラーが発生しました\n ${error.message}`;
    }
}


// document.addEventListener("DOMContentLoaded", () => {
//     event.preventDefault();
//     //入力値などの取得
//     // container = document.getElementById("container");
//     // const form = document.getElementById("getcity");
//     // const input_group = document.getElementById("input-group");
//     // const resultDiv = document.getElementById("result");

//     const city = document.getElementById("inputCity").value;
    

//     form.addEventListener("submit", async (event) => {
//         event.preventDefault(); // デフォルトのフォーム送信を無効化

        
//         if (!city) {
//             resultDiv.textContent = "都市名を入力してください。";
//             return;
//         }
        
//     });
// });
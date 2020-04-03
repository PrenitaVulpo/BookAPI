const curl = require("curl");
const jsdom = require("jsdom");
const url = "https://books.google.com.br/books?id=JEeMDwAAQBAJ&sitesec=buy&source=gbs_buy_r";
curl.get(url, null, (err,resp,body)=>{
    if(resp.statusCode == 200){
        parseData(body);
    }
    else{
        //some error handling
        console.log("error while fetching url");
    }
});

function parseData(html){
    const {JSDOM} = jsdom;
    const dom = new JSDOM(html);
    const $ = (require('jquery'))(dom.window);
    const tabela = $("#summary_content table tr td");
    const contator = $("#summary_content table tr").slice(1);
    var retorno = [];
    var nameTest = [];
    var linkTest = [];
    var priceTest = [];


    function strTreatment(linkS) {
        return linkS.substr(71);
    }

    tabela.each(function(){
            nameTest.push($(this).children("a").text());
            linkTest.push($(this).children("a").attr("href"));
            priceTest.push($(this).children(".noprice").text());
            priceTest.push($(this).children(".price").text());
        }
    );


    //priceTest.push(tabela.children(".price").text());
    nameTest = nameTest.filter(word => !word.length == 0);
    linkTest = linkTest.filter(link => !link == 0);
    linkTest = linkTest.map(strTreatment);
    priceTest = priceTest.filter(preco => !preco == 0);

    var i;
    for(i = 0; i<contator.length; i++){
        retorno.push({
            retailerName: nameTest[i],
            price: priceTest[i],
            link: linkTest[i]
        })
    }



    // Print some information to actor log
    console.log(`URL: %s, TITLE: `, url);
    console.log(nameTest.length);
    console.log(linkTest.length);
    console.log(priceTest);
    console.log(JSON.stringify(retorno));

    // Manually add a new page to the queue for scraping.
    // To make this work, make sure the "Use request queue" option is enabled.
    //context.enqueueRequest({ url: 'http://www.example.com' });

    // Return an object with the data extracted from the page.
    // It will be stored to the resulting dataset.

    return retorno
}
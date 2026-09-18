const dimension =150
const urlsPicsum = [];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const imgStart = getRandomInt(1,100)

function createImages(size) {

    for (let i = imgStart; i <= imgStart+7; i++) {
        const url = `https://picsum.photos/id/${i}/${size}`;
        urlsPicsum.push(url);
    }
}

function duplicateImages(imgList){
    let cards=[]
    for(let img of imgList){
        cards.push(img);
        cards.push(img);
    }
    return cards;
}

function shuffle(array){
    permutation=[]
    if(array.length === 0){
        permutation=[...array];
    }else{
        for (let i = array.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

createImages(dimension);
shuffle(duplicateImages(urlsPicsum));










document.querySelector('.busca').addEventListener('submit', async (e) =>{
    //prevenir que o form seja atualizado
    e.preventDefault() //previe o comportamento padrão

    let input = document.querySelector('#searchInput').value

    if(input !== ''){
        clearInfo()
        showWarning('Carregando')

        //fez a requisição
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=1294836dc1f1fa563a6525a90cd8ba7e&units=metric&lang=pt_br`

        //espera o resultado e armazena em 'results'
        let results = await fetch(url)

        //aguarda a transformação do resultado em json e armazena em 'json'
        let json = await results.json()

        //verificar se a cidade foi encontrada
        if(json.cod ===200){
            showInfo({
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            windAngle: json.wind.deg
            })
        }else{
            clearInfo()
            showWarning('Não encontramos esta cidade. Tente novamente')
        }
    }else{
        clearInfo()
    }
})

//mostrar informações do clima na tela
function showInfo(json){
    showWarning('')

    
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`

    document.querySelector('.resultado').style.display = 'block'
}

//limpar a tela ao procurar nova cidade
function clearInfo(){
    showWarning('')
    document.querySelector('.resultado').style.display = 'none'
}

//aviso
function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg
}
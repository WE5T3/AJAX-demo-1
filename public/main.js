console.log('这是main.js内容\n')

getCSS.onclick = () => {
    const request = new XMLHttpRequest() //readyState=0

    request.open('GET', '/style.css') //readyState=1
    request.onreadystatechange = () => {
        // console.log(request.readyState)
        // 虽然下载完成,但是不知道是 成功 2xx 还是失败 4xx 5xx
        if (request.readyState === 4) {
            console.log('CSS下载完成')
            console.log(request.status + ' ' + request.statusText)
            if (request.status >= 200 && request.status < 300) {
                //创建style标签
                const style = document.createElement('style')
                //填写style内容
                style.innerHTML = request.response
                //将style插入head里
                document.head.appendChild(style)
            } else {
                alert(
                    '加载CSS失败 \n' + request.status + ' ' + request.statusText
                )
            }
        }
    }
    request.send() //readyState=2
}

getJS.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/2.js')

    request.onload = () => {
        const script = document.createElement('script')

        script.innerHTML = request.response

        document.head.appendChild(script)
    }
    request.send()
}

getHTML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/3.html')

    request.onload = () => {
        // console.log('html:request.response')
        // console.log(request.response)

        const div = document.createElement('div')

        div.innerHTML = request.response

        document.body.appendChild(div)
    }
    request.onerror = () => {
        console.log('ERR:3.html')
    }
    request.send()
}

getXML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/4.xml')
    request.onreadystatechange = () => {
        if (
            request.readyState === 4 &&
            request.status >= 200 &&
            request.status < 300
        ) {
            const dom = request.responseXML
            const xmlText = dom.getElementsByTagName('warning')[0].textContent
            console.log(xmlText.trim())
        }
    }
    request.send() //readyState=2
}

getJSON.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/5.json')
    request.onreadystatechange = () => {
        if (
            request.readyState === 4 &&
            request.status >= 200 &&
            request.status < 300
        ) {
            // console.log(request.response)
            const object = JSON.parse(request.response)
            console.log(object)
            myName.textContent = object.name
        }
    }
    request.send() //readyState=2
}

let pageN = 1
getPage.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', `/page${pageN + 1}.json`)
    request.onreadystatechange = () => {
        if (
            request.readyState === 4 &&
            request.status >= 200 &&
            request.status < 300
        ) {
            // console.log(request.response)
            const array = JSON.parse(request.response)
            array.forEach((item) => {
                const li = document.createElement('li')
                li.textContent = item.id
                pageX.appendChild(li)
            })
            pageN += 1
        }
    }
    request.send()
}

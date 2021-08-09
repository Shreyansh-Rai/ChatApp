const socket = io('http://localhost:8000')

var sfx = new Audio('chime.mp3')
const textinput = document.getElementById('textin')
const chatarea = document.querySelector('.chatarea') 
const form = document.getElementById('sendarea')
const addtext = (mes,pos)=>
{
    const newtext= document.createElement('div')
    newtext.innerText= mes
    newtext.classList.add('message')
    console.log('userin')
    newtext.classList.add(pos) 
    chatarea.append(newtext)
    if(pos ==='l')//adding an incoming message
    {
        sfx.play()
    }
}

const username = prompt("Enter Username")
socket.emit('newuserjoined',username)
socket.on('userjoined',(usern)=>
{
    addtext(`${usern} Just joined the chat` , 'l')
})
socket.on('recieve',(textobj)=>
{
    addtext(`${textobj.username} : ${textobj.message}`, 'l')
})
socket.on('discon', (usern)=>
{
    addtext(`${usern} Has left the chat`, 'l')
})

form.addEventListener('submit',(ev)=>
{
    ev.preventDefault()
    const mes= textinput.value
    addtext(`You: ${mes}`, 'r')
    socket.emit('send', mes)
    textinput.value=''
})

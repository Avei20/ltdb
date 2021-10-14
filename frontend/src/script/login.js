var username = document.getElementById('username')
var pass = document.getElementById('password')
var btnMasuk = document.getElementById('btnMasuk')

var pathLogin = "https://lantabur.sch.id/ltms/login"

function login() 
{
    var username = document.getElementById('username')
    var pass = document.getElementById('password')
    
    fetch(pathLogin, 
        {
            method : 'post',
            body : 
            {
                username : username.value,
                password : pass.value
            }
        }    
    ).then ((res) => 
    {
        alert(res)
    })
    .catch (err => console.log(err))
}



function print () 
{
    alert(`${username.value} hayoo coba coba login ya? sabar blum jadi.`)
}


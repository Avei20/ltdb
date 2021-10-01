var username = document.getElementById('username')
var pass = document.getElementById('password')
var btnMasuk = document.getElementById('btnMasuk')

var pathLogin = "https://lantabur.sch.id/ltms/login"

function login(username, pass) 
{
    fetch('localhost:2008/login', 
        {
            method : 'post',
            body : 
            {
                username :username,
                password : pass
            }
        }    
    ).then ((res) => 
    {
        console.log(res)
    })
    .catch (err => console.log(err))
}

// btnMasuk.addEventListener('click', console.log(username.values))

function print () 
{
    alert(`${username.value} hayoo coba coba login ya? sabar blum jadi.`)
}


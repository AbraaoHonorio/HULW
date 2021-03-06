import React from 'react'
import './Login.css'
import newLogin from './actions/validation'

class Login extends React.Component{

  constructor(props){
    super(props);
    this.state            = {user: '', pass: ''};
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleSubmit     = this.handleSubmit.bind(this);
    this.verificar        = this.verificar.bind(this);
  }

  handleChangeUser(event) {
    this.setState( {user: formatarCpf(event.target.value)} ); // atualiza o valor do cpf formatado
  }

  handleChangePass(event) {
    this.setState({ pass: event.target.value });
  }

  handleSubmit(event) {

    event.preventDefault();
  }

  verificar(){
    if(this.state.user === '' || this.state.pass === '' ){
      alert('Por favor, preencha os campos!')
    }
    else{
      if(!newLogin(this.state.user,this.state.pass)){
        alert('Usuário e/ou senha digitados incorretamente!');
        //
      }
      else{
        var base64 = require('base-64')
        var utf8 = require('utf8')

        var cpf = this.state.user;
        var bytes = utf8.encode(cpf)
        var encoded = base64.encode(bytes)

        window.open("/userpage?"+encoded,"_self");
      }
    }

  }

  render(){
    return (

      <div>
        <div id="login">
          <form name='form-login' onSubmit={this.handleSubmit}>
            <h3>Login</h3>
            <span className="fontawesome-user"></span>
            <input type="text-number" value={this.state.user} minLength='14' maxLength='14' placeholder="CPF" name="CPF" onChange={this.handleChangeUser}/>
            <span className="fontawesome-lock"></span>
            <input type="password" value={this.state.pass} placeholder="Senha" onChange={this.handleChangePass}/>
            <div>
              <a href="/esqueciSenha">Esqueci a senha</a>
            </div>
            <input type="submit" value="Login" onClick={this.verificar} />
          </form>
        </div>
      </div>

    )
  }
}
function formatarCpf(cpf){
  cpf = cpf.replace(/\D/g,"");
  cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
  return cpf;
}
export default Login

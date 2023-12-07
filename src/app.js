import React from "react";
import Header from "./components/Header";
import Users from './components/Users'
import AddUser from "./components/AddUser";
import Axios from "axios";

const baseUrl = "https://reqres.in/api/users?page=1"
  
  class App extends React.Component {
    constructor(props) {
      super(props)

      Axios.get(baseUrl).then((res) => {
        this.setState({users: res.data.data})
      })

      this.state = {
          users: []
      }
      this.addUser = this.addUser.bind(this)
      this.deleteUser = this.deleteUser.bind(this)
      this.editUser = this.editUser.bind(this)
  }
    render() {
      return (<div>
        <Header title="Список пользовалетелей" />
        <main>
            <Users users={this.state.users} onEdit={this.editUser} onDelete={this.deleteUser} />
        </main>
        <aside>
          <AddUser onAdd={this.addUser} />
        </aside>
      </div>)
    }

    editUser(user) {
      let allUsers = this.state.users
      allUsers[user.id - 1] = user

      this.setState({users: []}, () => {
        this.setState({users: [...allUsers]})
      })
    }

    deleteUser(id) {
      this.setState({
        users: this.state.users.filter((el) => el.id !== id)
      })
    }

    addUser(user) {
      const id = this.state.users.length + 1
      this.setState({ users: [...this.state.users, {id, ...user}] })
    }
}

  export default App
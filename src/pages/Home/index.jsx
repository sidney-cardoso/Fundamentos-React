import React, { useState, useEffect } from 'react'
import { Card } from '../../components/Card'
import './style.css'

export function Home() {
    const [studentName, setStudentName] = useState('')
    const [students, setStudents] = useState([])
    const [user, setUser] = useState({name: '', avatar: ''})

    const handleAddStudent = () => {
        const newStudent = {
            name: studentName,
            time: new Date().toLocaleTimeString('pt-br', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })
        }
        setStudents(prevState => [...prevState, newStudent])
    }
    useEffect(() => {
      async function fetchData() {
        const response = await fetch('https://api.github.com/users/sidney-cardoso')
        const data = await response.json()
        setUser({
          name: data.name,
          avatar: data.avatar_url,
        })
      }
      fetchData()
    }, [])

    return (
        <div className="container">
            <header>
                <h1>Presence List</h1>
                <div>
                  <strong>{user.name}</strong>
                  <img src={user.avatar} alt="Imagem de perfil" />
                </div>
            </header>
            <input
                type="text"
                placeholder="name..."
                onChange={e => setStudentName(e.target.value)}
            />

            <button type="button" onClick={handleAddStudent}>
                Add
            </button>
            {students.map(student => (
                <Card
                    key={student.time}
                    name={student.name}
                    time={student.time}
                />
            ))}
        </div>
    )
}

// export default Home

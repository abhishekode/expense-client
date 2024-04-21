import { useCurrentUser } from 'context/userContext'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from './Login'
import Register from './Register'


const Auth = () => {
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState<'login' | 'register'>('login')
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    if (currentUser) {
      if (currentUser.token) {
        navigate('/');
      }
    }
  }, [currentUser, navigate]);


  return (
    <section className="bg-white container mx-auto">
      <div className="py-20">
        <main className="">
          <div className="flex justify-center items-center">
            <button
              onClick={() => setSelectedTab('login')}
              className={`${selectedTab === 'login'
                ? 'bg-primary text-white rounded-l-full'
                : 'bg-gray-200 text-gray-700 rounded-l-full'
                } px-4 py-2  focus:outline-none transition-transform`}
            >
              Login
            </button>
            <button
              onClick={() => setSelectedTab('register')}
              className={`${selectedTab === 'register'
                ? 'bg-primary text-white rounded-r-full'
                : 'bg-gray-200 text-gray-700 rounded-r-full'
                } px-4 py-2 focus:outline-none transition-transform`}
            >
              Register
            </button>
          </div>
          <div className="overflow-hidden">
            <div
              className={`transition-transform transform ${selectedTab === 'login' ? 'translate-y-1' : 'translate-y-0'
                }`}
            >
              {selectedTab === 'login' ?
                (<Login setActiveTab={setSelectedTab} />) :
                (<Register setActiveTab={setSelectedTab} />)}
            </div>
          </div>
        </main>
      </div>
    </section>
  )
}

export default Auth
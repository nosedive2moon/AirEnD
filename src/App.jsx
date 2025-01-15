import React, { useState } from 'react'
    import { motion } from 'framer-motion'
    import { ethers } from 'ethers'

    const StarIcon = () => (
      <svg viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
    )

    const machines = [
      {
        id: 1,
        name: 'ASML EUV NXE:3400C',
        image: 'https://source.unsplash.com/600x400/?semiconductor,chip',
        price: '0.5 ETH/hour',
        rating: 4.9,
        description: 'State-of-the-art EUV lithography machine',
        location: 'Eindhoven, Netherlands'
      },
      {
        id: 2,
        name: 'Applied Materials Endura',
        image: 'https://source.unsplash.com/600x400/?factory,machine',
        price: '0.3 ETH/hour',
        rating: 4.7,
        description: 'Advanced PVD system for metal deposition',
        location: 'Santa Clara, USA'
      },
      {
        id: 3,
        name: 'Lam Research Kiyo',
        image: 'https://source.unsplash.com/600x400/?technology,electronics',
        price: '0.2 ETH/hour',
        rating: 4.8,
        description: 'High-performance etch system',
        location: 'Fremont, USA'
      }
    ]

    export default function App() {
      const [connected, setConnected] = useState(false)
      const [account, setAccount] = useState(null)

      const connectWallet = async () => {
        if (window.ethereum) {
          try {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const accounts = await provider.send('eth_requestAccounts', [])
            setAccount(accounts[0])
            setConnected(true)
          } catch (error) {
            console.error(error)
          }
        }
      }

      return (
        <div className="container">
          <header className="py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-primary">AirEnD by Playsafe</h1>
                <div className="flex space-x-4 mt-4">
                  <button className="menu-btn">
                    Dashboard
                  </button>
                  <button className="menu-btn">
                    Rent a Machine
                  </button>
                  <button className="menu-btn">
                    Insert a Machine
                  </button>
                </div>
              </div>
              <div className="absolute top-6 right-6">
                <button
                  onClick={connectWallet}
                  className="connect-btn"
                >
                  {connected ? `Connected: ${account.slice(0, 6)}...` : 'Connect Wallet'}
                </button>
              </div>
            </div>
          </header>

          <main className="py-12">
            <section className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Rent Semiconductor Equipment
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Access cutting-edge semiconductor manufacturing equipment through NFT-based rentals.
              </p>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {machines.map((machine) => (
                <motion.div
                  key={machine.id}
                  whileHover={{ scale: 1.02 }}
                  className="card"
                >
                  <img
                    src={machine.image}
                    alt={machine.name}
                    className="card-image"
                  />
                  <div className="card-content">
                    <div className="card-rating">
                      <StarIcon />
                      <span>{machine.rating}</span>
                    </div>
                    <h3 className="card-title">{machine.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">{machine.location}</p>
                    <p className="text-gray-400 text-sm mb-4">{machine.description}</p>
                    <div className="card-footer">
                      <span className="card-price">{machine.price}</span>
                      <button className="btn-primary">
                        Rent Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </main>
        </div>
      )
    }

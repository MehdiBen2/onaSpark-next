'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faChartLine, 
  faBuilding, 
  faUser, 
  faShieldAlt, 
  faBook,
  faSignOutAlt,
  faChevronDown,
  faUsers,
  faCog
} from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

export default function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAdminOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isActive = (path: string) => pathname === path ? 'bg-white text-[var(--ona-primary)]' : 'hover:bg-white/20'

  if (!session) {
    return null
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 
      text-white 
      shadow-md 
      transition-all duration-300"
      style={{ 
        background: 'linear-gradient(135deg, var(--ona-primary) 0%, var(--ona-secondary) 100%)', 
        height: '64px' 
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center h-full">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center -my-4">
          <Link href="/dashboard" className="flex items-center">
            <div className="relative w-20 h-20">
              <Image
                src="/images/onalogos/ona_logo.png"
                alt="ONA Logo"
                fill
                className="object-contain brightness-0 invert"
                priority
                quality={100}
                sizes="(max-width: 768px) 80px, 96px"
              />
            </div>
          </Link>
        </div>

        {/* Navigation and User menu */}
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard"
            className={`${isActive('/dashboard')} px-5 py-2 rounded-full text-base font-medium transition-all duration-200 flex items-center space-x-2.5`}
          >
            <FontAwesomeIcon icon={faChartLine} className="h-4 w-4" />
            <span>Tableau de bord</span>
          </Link>
          <Link
            href="/departements"
            className={`${isActive('/departements')} px-5 py-2 rounded-full text-base font-medium transition-all duration-200 flex items-center space-x-2.5`}
          >
            <FontAwesomeIcon icon={faBuilding} className="h-4 w-4" />
            <span>Départements</span>
          </Link>
          <Link
            href="/profile"
            className={`${isActive('/profile')} px-5 py-2 rounded-full text-base font-medium transition-all duration-200 flex items-center space-x-2.5`}
          >
            <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
            <span>Mon Profil</span>
          </Link>
          {session?.user?.role === 'Admin' && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsAdminOpen(!isAdminOpen)}
                className={`${pathname.startsWith('/admin') ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-100'} px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2`}
              >
                <FontAwesomeIcon icon={faShieldAlt} className="h-4 w-4" />
                <span>Administration</span>
                <FontAwesomeIcon 
                  icon={faChevronDown} 
                  className={`h-3 w-3 ml-1 transition-transform duration-200 ${isAdminOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isAdminOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link
                      href="/admin/users"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <FontAwesomeIcon icon={faUsers} className="h-4 w-4" />
                      <span>Gestion Utilisateurs</span>
                    </Link>
                    <Link
                      href="/admin/settings"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <FontAwesomeIcon icon={faCog} className="h-4 w-4" />
                      <span>Paramètres</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
          <Link
            href="/documentation"
            className={`${isActive('/documentation')} px-5 py-2 rounded-full text-base font-medium transition-all duration-200 flex items-center space-x-2.5`}
          >
            <FontAwesomeIcon icon={faBook} className="h-4 w-4" />
            <span>Documentation</span>
          </Link>

          {/* User info and logout */}
          <div className="flex items-center pl-6 border-l border-white/20">
            <span className="text-sm font-medium mr-4 flex items-center">
              <FontAwesomeIcon icon={faUser} className="h-4 w-4 mr-2" />
              {session.user.name || session.user.email}
            </span>
            <motion.button
              onClick={() => signOut({ callbackUrl: '/login' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                bg-white/20 
                hover:bg-white/30 
                text-white 
                p-2 
                rounded-full 
                transition-all 
                duration-300 
                flex 
                items-center 
                justify-center
              "
              title="Déconnexion"
            >
              <FontAwesomeIcon 
                icon={faSignOutAlt} 
                className="h-5 w-5" 
              />
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  )
}

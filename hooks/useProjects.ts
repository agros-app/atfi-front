'use client'
import { getProjects } from '@/lib/api'
import { Project } from '@/types/api'
import { useEffect, useState } from 'react'

const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    getProjects().then((projects) => setProjects(projects))
  }, [])

  return { projects }
}

export default useProjects

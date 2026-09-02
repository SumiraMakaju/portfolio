import React, { useState } from 'react'
import { Box, Cylinder } from '@react-three/drei'

interface HobbyObjectProps {
  id: string
  position: [number, number, number]
  onClick: (id: string) => void
}

export default function HobbyObject({
  id,
  position,
  onClick
}: HobbyObjectProps) {
  const [hovered, setHovered] = useState(false)

  const renderTV = () => (
    <group>
      <Box args={[1.5, 1, 0.5]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#444444" />
      </Box>
      <Box args={[1.3, 0.8, 0.1]} position={[0, 0.5, 0.26]}>
        <meshStandardMaterial color={hovered ? "#88ccff" : "#111111"} emissive={hovered ? "#88ccff" : "#000000"} emissiveIntensity={hovered ? 0.5 : 0} />
      </Box>
      <Cylinder args={[0.02, 0.02, 0.5]} position={[-0.3, 1.2, 0]} rotation={[0, 0, 0.5]}>
        <meshStandardMaterial color="#888888" />
      </Cylinder>
      <Cylinder args={[0.02, 0.02, 0.5]} position={[0.3, 1.2, 0]} rotation={[0, 0, -0.5]}>
        <meshStandardMaterial color="#888888" />
      </Cylinder>
    </group>
  )

  const renderDesk = () => (
    <group>
      <Box args={[3, 0.2, 1.5]} position={[0, 1.4, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      <Box args={[0.2, 1.4, 0.2]} position={[-1.3, 0.7, -0.6]}>
        <meshStandardMaterial color="#5C3A21" />
      </Box>
      <Box args={[0.2, 1.4, 0.2]} position={[1.3, 0.7, -0.6]}>
        <meshStandardMaterial color="#5C3A21" />
      </Box>
      <Box args={[0.2, 1.4, 0.2]} position={[-1.3, 0.7, 0.6]}>
        <meshStandardMaterial color="#5C3A21" />
      </Box>
      <Box args={[0.2, 1.4, 0.2]} position={[1.3, 0.7, 0.6]}>
        <meshStandardMaterial color="#5C3A21" />
      </Box>
      <Box args={[0.5, 0.05, 0.7]} position={[0, 1.525, 0]} rotation={[0, 0.2, 0]}>
        <meshStandardMaterial color={hovered ? "#ffffff" : "#dddddd"} />
      </Box>
    </group>
  )

  const renderArmchair = () => (
    <group>
      <Box args={[1.5, 0.5, 1.5]} position={[0, 0.25, 0]}>
        <meshStandardMaterial color="#b33939" />
      </Box>
      <Box args={[1.5, 1.5, 0.4]} position={[0, 1.25, -0.55]}>
        <meshStandardMaterial color="#b33939" />
      </Box>
      <Box args={[0.4, 1, 1.5]} position={[-0.75, 0.8, 0]}>
        <meshStandardMaterial color="#cc4141" />
      </Box>
      <Box args={[0.4, 1, 1.5]} position={[0.75, 0.8, 0]}>
        <meshStandardMaterial color="#cc4141" />
      </Box>
    </group>
  )

  return (
    <group
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation()
        onClick(id)
      }}
      scale={hovered ? 1.05 : 1}
    >
      {id === 'tv' && renderTV()}
      {id === 'desk' && renderDesk()}
      {id === 'armchair' && renderArmchair()}
    </group>
  )
}

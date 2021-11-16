import React from 'react'

interface FriesIconProps {
  staked?: number
  size?: number
  v1?: boolean
  v2?: boolean
  v3?: boolean
}

const FriesIcon: React.FC<FriesIconProps> = ({ staked = 0, size = 36, v1, v2, v3 }) => (
  <span
    role="img"
    style={{
      fontSize: size,
      filter: v1 ? 'saturate(0.5)' : undefined,
    }}
  >
    {staked === 0 ?
      <>🏦</> : staked === 1 ? <>🌍</> :
        <>💳</>
    }
  </span>
)

export default FriesIcon

export function NasaAnimalResearchCardVisual() {
  return (
    <div className="dilemma-card-img-wrapper">
      <img
        src="https://images-assets.nasa.gov/image/S61-00203/S61-00203~medium.jpg"
        alt="Chimpancé Ham y cápsula de ensayo biomédico (NASA, Proyecto Mercury)"
        onError={(e) => {
          e.currentTarget.src =
            'https://images-assets.nasa.gov/image/g61-00337/g61-00337~medium.jpg'
        }}
        className="dilemma-card-img"
        style={{ objectPosition: 'center 25%' }}
      />
    </div>
  )
}

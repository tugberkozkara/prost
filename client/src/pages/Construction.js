import underConstrImg from '../media/503.png';

const Construction = () => {
  return (
    <div className='row col-lg-8 mx-auto my-0 justify-content-center'>
        <div className="card align-items-center border-white">
            <img src={underConstrImg} className="card-img-top rounded col-lg-8" />
            <div className="card-body p-5 text-center">
                <h5 className="card-title mx-auto">Prost! is under construction.</h5>
                <h6 className="card-subtitle my-2 text-muted">We'll be back soon!</h6>
            </div>
        </div>
    </div>
  )
}

export default Construction

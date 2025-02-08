export default ({title,status,description,url})=>{
    return  <div className="card bg-base-100 w-96 shadow-xl">
    <figure>
        <img
            src={url}
            alt="Shoes" />
    </figure>
    <div className="card-body">
        <h2 className="card-title">
            {title}
            <div className="badge badge-secondary">{status}</div>
        </h2>
        <p>{description}</p>
        {/* <div className="card-actions justify-end">
            <div className="badge badge-outline">Fashion</div>
            <div className="badge badge-outline">Products</div>
        </div> */}
    </div>
</div>
};
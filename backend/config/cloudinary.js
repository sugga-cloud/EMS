import { v2 as cloudinary } from 'cloudinary';

export default (async function(image) {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dmhjf0t58', 
        api_key: '375732268832297', 
        api_secret: 'LPMBOd1Bzpyvy_fBaPcNFXJ_dDU' // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           image, {
               public_id: 'event',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    return uploadResult.secure_url;
});
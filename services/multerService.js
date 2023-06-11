const multer = require('multer');

exports.multerBlogImage = {
    storage: multer.diskStorage({
        destination: function(req, file, next) {
            next(null, 'public/images/admin/blogs');
        },
        filename: function(req, file, next) {
            const ext = file.mimetype.split('/')[1];
            next(null, file.fieldname + '-' + Date.now() + '.' + ext);
        }
    }),
    fileFilter: function(req, file, next) {

        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            next(null, true);
          } else {
            next(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
}

exports.multerProfileImage = {
    storage: multer.diskStorage({
        destination: function(req, file, next) {
            next(null, 'public/images/admin/profile');
        },
        filename: function(req, file, next) {
            const ext = file.mimetype.split('/')[1];
            next(null, file.fieldname + '-' + Date.now() + '.' + ext);
        }
    }),
    fileFilter: function(req, file, next) {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            next(null, true);
          } else {
            next(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
}

















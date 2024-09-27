var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const app = express(); // Khởi tạo biến `app` với express


var indexRouter = require('./routes/index');

var booksRouter = require('./routes/books');
var categoriesRouter = require('./routes/category');
var customersRouter = require('./routes/customer');
var ordersRouter = require('./routes/orders');
var orderItemsRouter = require('./routes/orderItems'); // Import routervar app = express();
var adminRouter = require('./routes/admin');
// khai báo cor
const cors = require('cors');

const PORT = process.env.PORT || 3200;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Middleware để phục vụ tệp tin tĩnh từ thư mục 'uploads/admins'
app.use('/uploads/admins', express.static(path.join(__dirname, 'uploads/admins')));


// Middleware để cấu hình CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));




//kết nối db
const connection = mongoose.connect('mongodb://localhost:27017/DA_TN',{
})
.then(()=> console.log('>>>>>>> DB đã kết nối thành công!!!!'))
.catch(err=> console.log('>>>>>>>> DB error: ',err));
app.use('/', indexRouter);
app.use('/books',booksRouter);
app.use('/categories',categoriesRouter);
app.use('/customers',customersRouter);
app.use('/orders',ordersRouter);
app.use('/orders', orderItemsRouter);
app.use('/admins', adminRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/books`);
  console.log(`http://localhost:${PORT}/books/hot`);
  console.log(`http://localhost:${PORT}/books/featured`);
  console.log(`http://localhost:${PORT}/books/66d57256afc8a51793d73227`);
  console.log(`http://localhost:${PORT}/books/category/66e52d1113ae0384d3444c40`);
  console.log(`http://localhost:${PORT}/books/author/Nhiều%20Tác%20Giả`);
  console.log(`http://localhost:${PORT}/books/sortedByPrice?sortOrder=asc`);
  console.log(`http://localhost:${PORT}/books/sortedByPrice?sortOrder=desc`);
  console.log(`http://localhost:${PORT}/categories`);
  console.log(`http://localhost:${PORT}/categories/66d5672aafc8a51793d731ce`);
  console.log(`http://localhost:${PORT}/admins/register`);
  console.log(`http://localhost:${PORT}/admins/login`);
  console.log(`http://localhost:${PORT}/admins`);



});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

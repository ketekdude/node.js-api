'use strict';

module.exports = function(app) {
    var todoList = require('./controller');

    app.route('/')
        .get(todoList.index);

    app.route('/users')
        .get(todoList.users);

    app.route('/login')
        .post(todoList.login);

    app.route('/users')
        .post(todoList.createUsers);

    app.route('/get_job')
        .get(todoList.getJob);

    app.route('/get_job')
        .post(todoList.getJobPost);

    app.route('/get_job_detail')
        .post(todoList.getJobDetail);
};
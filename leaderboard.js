Dispatch = new Mongo.Collection('dispatch');

Router.route('/', function () {

    this.layout('main');
    this.render('mobile');

    this.render('desktop', {
        to: 'desktop'
    });

});
Router.route('/apple', function () {
    this.layout('main');

    this.render('mobileapple');

    this.render('mobile', {
        to: 'desktop'
    });


});

if (Meteor.isServer) {

    Meteor.publish('dispatch', function (arguments) {
        return Dispatch.find({
            TimestampISO: {
                $gte: Date.create(arguments.time).format('ISO8601_DATETIME')
            }
        }, {
            sort: {
                TimestampISO: -1
            }
        });

    })
}

if (Meteor.isClient) {
    Session.setDefault('types', 'Fire');
    Session.setDefault('time', '6 hours ago');
    Session.setDefault('time2', 'a year from now');
    Meteor.subscribe('dispatch', {
        'time': Session.get('time')
    });

    Template.desktop.helpers({
        dispatches: function () {
            var when = Date.create(Session.get('time')).format('ISO8601_DATETIME');
            var when2 = Date.create(Session.get('time2')).format('ISO8601_DATETIME');
            return Dispatch.find({
                'TimestampISO': {
                    $gte: when,
                    $lte: when2
                },
                $or: [{
                    'Category': 'Aid'
                }, {
                    'Category': Session.get('types')
                }]
            }, {
                sort: {
                    'TimestampISO': -1
                }
            });
        }
    });

    Template.desktop.events({

        'click #six': function (event) {
            event.preventDefault();
            Session.set('time', '6 hours ago');
            Session.set('time2', 'a year from now');
            Meteor.subscribe('dispatch', {
                'time': Session.get('time')
            });
        },
        'click #twelve': function (event) {
            event.preventDefault();
            Session.set('time', '12 hours ago');
            Session.set('time2', 'a year from now');
            Meteor.subscribe('dispatch', {
                'time': Session.get('time')
            });
        },
        'click #eighteen': function (event) {
            event.preventDefault();
            Session.set('time', '18 hours ago');
            Session.set('time2', 'a year from now');
            Meteor.subscribe('dispatch', {
                'time': Session.get('time')
            });
        },
        'click #twentyfour': function (event) {
            event.preventDefault();
            Session.set('time', '24 hours ago');
            Session.set('time2', 'a year from now');
            Meteor.subscribe('dispatch', {
                'time': Session.get('time')
            });
        },
        'click #show_all': function (event) {
            event.preventDefault();
            Session.set('types', 'Fire')
        },

        'click #aid_only': function (event) {
            event.preventDefault();
            Session.set('types', 'Aid')
        }
    });
    Template.mobile.helpers({
        dispatches: function () {
            return Dispatch.find({
                TimestampISO: {
                    $gte: Date.create('8 hours ago').format(Date.ISO8601_DATETIME)
                }
            }, {
                sort: {
                    TimestampISO: -1
                }
            });
        }

    });
    Template.mobileapple.helpers({
        dispatches: function () {
            return Dispatch.find({
                TimestampISO: {
                    $gte: Date.create('8 hours ago').format(Date.ISO8601_DATETIME)
                }
            }, {
                sort: {
                    TimestampISO: -1
                }
            });
        }

    });
}
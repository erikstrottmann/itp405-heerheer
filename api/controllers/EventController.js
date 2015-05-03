/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function(req, res) {
    var input = {
      name: req.param('event-name'),

      // location
      latitude: req.param('latitude'),
      longitude: req.param('longitude'),
      radius: req.param('radius'),

      // date and time
      start: req.param('start'),
      end: req.param('end'),
    };

    sails.log.info(input);

    Event.create(input).exec(function (err, event) {
      if (err) {
        req.flash("error", "couldn't create the event");
        return res.negotiate(err);
      }

      if (req.wantsJSON()) {
        return res.ok('Event creation successful!');
      }

      return res.redirect('/events');
    });
  },

  list: function(req, res) {
    Event.find().exec(function(err, events) {
      if (err) {
        req.flash('error', { errors: err });
        return res.view('event/list');
      }
      return res.view('event/list', { events: events, info: "hey" });
    });
  },
};

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

      creator: req.session.me,
    };

    sails.log.info(input);
    sails.log.info(req.session.me);

    Event.create(input).exec(function (err, event) {
      if (err) {
        req.flash("error", "couldn't create the event");
        return res.negotiate(err);
      }

      // if (req.wantsJSON()) {
      //   return res.ok('Event creation successful!');
      // }

      return res.redirect('/events');
    });
  },

  list: function(req, res) {
    Event.find()
    .populate('creator')
    .populate('attendees')
    .exec(function(err, events) {
      if (err) {
        req.flash('error', { errors: err });
        return res.view('event/list');
      }
      return res.view('event/list', { events: events });
    });
  },

  details: function(req, res) {
    if (!req.param('id')) { return res.redirect('events/list'); }

    Event.findOne(req.param('id'))
    .populate('creator')
    .populate('attendees')
    .exec(function(err, event) {
      if (err) { return res.redirect('events/list'); }
      return res.view('event/details', { event: event });
    });
  },

  checkIn: function(req, res) {
    if (!req.param('id')) { return res.redirect('events/list'); }

    var eventId = req.param('id');

    Event.findOne(eventId)
    .populate('attendees')
    .exec(function(err, event) {
      if (err) { return res.redirect('events/' + eventId); }

      event.attendees.add(req.session.me);

      event.save(function(err) {
        if (err) {
          req.flash('error', "couldn't check in :/ have you already checked into this event?" );
          return res.redirect('events/' + eventId);
        } else {
          req.flash('success', "checked in!");
        }
        return res.redirect('events/' + eventId);
      });
    });
  },
};

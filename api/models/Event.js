/**
* Event.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
    },

    // location
    latitude: 'float',
    longitude: 'float',
    radius: 'float',

    // date and time
    start: 'datetime',
    end: 'datetime',
  },

};


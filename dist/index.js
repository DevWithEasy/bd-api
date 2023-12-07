"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var zlib = require('zlib');
var fs = require('fs');
var divisionsBuffer = zlib.gunzipSync(fs.readFileSync('./assets/divisions.json.gz'));
var _divisions = JSON.parse(divisionsBuffer.toString());
var districtsBuffer = zlib.gunzipSync(fs.readFileSync('./assets/districts.json.gz'));
var _districts = JSON.parse(districtsBuffer.toString());
var upazillasBuffer = zlib.gunzipSync(fs.readFileSync('./assets/upazillas.json.gz'));
var _upazillas = JSON.parse(upazillasBuffer.toString());
var postOfficesBuffer = zlib.gunzipSync(fs.readFileSync('./assets/postoffices.json.gz'));
var _postOffices = JSON.parse(postOfficesBuffer.toString());
var unionsBuffer = zlib.gunzipSync(fs.readFileSync('./assets/unions.json.gz'));
var _unions = JSON.parse(unionsBuffer.toString());
var BD = /*#__PURE__*/function () {
  function BD() {
    _classCallCheck(this, BD);
  }
  _createClass(BD, null, [{
    key: "divisions",
    value: function divisions() {
      return _divisions.divisions;
    }
  }, {
    key: "districts",
    value: function districts() {
      return _districts.districts;
    }
  }, {
    key: "district",
    value: function district(id) {
      if (!id) {
        return {
          message: 'Plese insert a division id as params.'
        };
      }
      return this.districts().filter(function (district) {
        return district.division_id === id.toString();
      });
    }
  }, {
    key: "upazillas",
    value: function upazillas() {
      return _upazillas.upazillas;
    }
  }, {
    key: "upazilla",
    value: function upazilla(id) {
      if (!id) {
        return {
          message: 'Plese insert a district id as params.'
        };
      }
      return this.upazillas().filter(function (upazilla) {
        return upazilla.district_id === id.toString();
      });
    }
  }, {
    key: "unions",
    value: function unions() {
      return _unions.unions;
    }
  }, {
    key: "union",
    value: function union(id) {
      if (!id) {
        return {
          message: 'Plese insert a upazilla id as params.'
        };
      }
      return this.unions().filter(function (union) {
        return union.upazilla_id === id.toString();
      });
    }
  }, {
    key: "postOffices",
    value: function postOffices() {
      return _postOffices;
    }
  }, {
    key: "postOffice",
    value: function postOffice(id) {
      if (!id) {
        return {
          message: 'Plese insert a district id as params.'
        };
      }
      var district = this.districts().find(function (district) {
        return district.id === id.toString();
      });
      if (!district) {
        return {
          message: 'Plese insert a district id as params.'
        };
      }
      var find = [];
      var data = this.postOffices();
      for (var key in data) {
        var entry = data[key];
        if (entry.bn && entry.bn.district.trim() === district.bn_name.trim()) {
          find.push(entry.bn);
        }
      }
      return find;
    }
  }]);
  return BD;
}();
console.log(BD.districts());
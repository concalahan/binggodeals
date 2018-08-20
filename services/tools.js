var express = require('express'),
  async = require('async');
router = express.Router(),
  request = require('request'),
  fs = require('fs'),
  _ = require('lodash'),
  cheerio = require('cheerio');

module.exports = {
  getUrlTiki: async function() {
    var url = "https://tiki.vn/dien-thoai-may-tinh-bang/c1789?src=mega-menu";
    var getBrand = await request(url, async function(err, res, body) {
      if (err) {
        reject(err);
      } else {
        const $ = cheerio.load(body);
        var links = [];
        var anchor = $('a'); // get anchor

        /*
        * Check each anchor and process to get the url of Brand
        */
        anchor.each(function(){
          if (_.includes($(this).parent().parent().parent().attr("aria-labelledby"),"heading-brand")) {
            if(_.includes($(this).parent().parent().parent().attr("aria-labelledby"),"heading-brand_country")) {
              console.log("");
            }
            else {
              links.push($(this).attr('href'));
            }
          }

          if (_.includes($(this).parent().parent().parent().parent().attr("aria-labelledby"),"heading-brand")) {
            if(_.includes($(this).parent().parent().parent().parent().attr("aria-labelledby"),"heading-brand_country")) {
              console.log("");
            }
            else {
              links.push($(this).attr('href'));
            }
          }
        });

        /*
        * Delete href="javascript:void(0)" and add https://tiki.vn/ to the begining
        * Then push all to the brandUrl[]
        */
        var brandUrl = [];
        for (var i = 0;i<links.length;i++) {
          if(_.includes(links[i],"/dien-thoai-may-tinh-bang/")) {
            links[i] = "https://tiki.vn" + links[i];
            brandUrl.push(links[i]);
          }
        }

        // for (var i = 0;i<brandUrl.length;i++) {
        //   console.log(brandUrl[i]);
        // }
        var allUrl = [];
        /* Get all URL of "Điện thoại,Máy tính bảng" */
        for(let url of brandUrl){
          var getUrl = await request(url, function(err, res, body) {
            if (err) {
              reject(err);
            } else {
              const $ = cheerio.load(body);
              var anchor = $('a');
              var links = [];
              anchor.each(function(){
                var href = $(this).attr('href');
                if (_.includes(String($(this).parent().attr("class")),"product-item")) {
                  links.push($(this).attr('href'));
                }
              });
              for (var i =0;i<links.length;i++) {
                console.log(links[i]);
              }
            }
          });
        }

      }
    });
  }
}

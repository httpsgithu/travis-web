/* global EmojiConvertor */
import config from 'travis/config/environment';
import Ember from 'ember';

const emojiConvertor = new EmojiConvertor();

emojiConvertor.img_sets.apple.path = `${config.emojiPrepend}/images/emoji/`;
emojiConvertor.include_title = true;

var _escape, _githubCommitReferenceLink, _githubCommitReferenceRegexp,
  _githubReferenceLink, _githubReferenceRegexp, _githubUserLink, _githubUserRegexp,
  formatMessage, githubify;

formatMessage = function (message, options) {
  message = message || '';
  if (options.short) {
    message = message.split(/\n/)[0];
  }
  message = emojiConvertor.replace_colons(_escape(message));
  if (options.repo) {
    message = githubify(message, Ember.get(options.repo, 'owner'), Ember.get(options.repo, 'name'));
  }
  if (options.pre) {
    message = message.replace(/\n/g, '<br/>');
  }
  return message;
};

githubify = function (text, owner, repo) {
  text = text.replace(_githubReferenceRegexp, function (reference, matchedOwner, matchedRepo, matchedNumber) {
    return _githubReferenceLink(reference, {
      owner: owner,
      repo: repo
    }, {
      owner: matchedOwner,
      repo: matchedRepo,
      number: matchedNumber
    });
  });
  text = text.replace(_githubUserRegexp, function (reference, username) {
    return _githubUserLink(reference, username);
  });
  text = text.replace(_githubCommitReferenceRegexp, function (reference, matchedOwner, matchedRepo, matchedSHA) {
    return _githubCommitReferenceLink(reference, {
      owner: owner,
      repo: repo
    }, {
      owner: matchedOwner,
      repo: matchedRepo,
      sha: matchedSHA
    });
  });
  return text;
};

_githubReferenceRegexp = new RegExp('([\\w-]+)?\\/?([\\w-]+)?(?:#|gh-)(\\d+)', 'g');

_githubReferenceLink = function (reference, current, matched) {
  var owner, repo;
  owner = matched.owner || current.owner;
  repo = matched.repo || current.repo;
  return '<a href="' + config.sourceEndpoint + '/' + owner + '/' + repo + '/issues/' + matched.number + '">' + reference + '</a>';
};

_githubUserRegexp = new RegExp('\\B@([\\w-]+)', 'g');

_githubUserLink = function (reference, username) {
  return '<a href="' + config.sourceEndpoint + '/' + username + '">' + reference + '</a>';
};

_githubCommitReferenceRegexp = new RegExp('([\\w-]+)?\\/([\\w-]+)?@([0-9A-Fa-f]+)', 'g');

_githubCommitReferenceLink = function (reference, current, matched) {
  var owner, repo, url;
  owner = matched.owner || current.owner;
  repo = matched.repo || current.repo;
  let slug = `${owner}/${repo}`;
  // TODO: this duplicated the implementation of the githubCommit method
  // in the urls service, but I didn't want to try and rewrite this entire file
  url = `${config.sourceEndpoint}/${slug}/commit/${matched.sha}`;
  return '<a href="' + url + '">' + reference + '</a>';
};

_escape = function (text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

export {
  formatMessage
};

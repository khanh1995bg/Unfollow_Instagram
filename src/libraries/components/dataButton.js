const BUTTONS_SELECT_FOLLOWER = [
    'Select all',
    'Deselect all',
    'Invert selection',
    'Select segment',
    'Select non-followers',
    'Select ghost users',
    'Select inactive users',
    'Cancel'
];

const BUTTONS_SELECT = [
    'Select all',
    'Deselect all',
    'Invert selection',
    'Select segment',
    'Select non-following',
    'Select ghost followers',
    'Select inactive users',
    'Cancel'
];
const CANCEL_INDEX_SELECT = 7;

const BUTTONS_ACTION = [
    'Unfollow',
    'Add to Whitelist',
    'Remove from Whitelist',
    'Cancel'
];
const CANCEL_INDEX_ACTION = 3;

const BUTTONS_ACTION_FOLLOWER = [
    'Block',
    'Add to Whitelist',
    'Remove from Whitelist',
    'Cancel'
];
const CANCEL_INDEX_ACTION_FOLLOWER = 3;


const BUTTONS_LIST = [
    'Load all',
    'Scroll to top',
    'Scroll to bottom',
    'Cancel'
];
const CANCEL_INDEX_LIST = 3;

var BUTTONS_SELECT_LIKE = [
    'Select all',
    'Deselect all',
    'Invert selection',
    'Select segment',
    'Cancel'
];
var CANCEL_INDEX_SELECT_LIKE = 4;

var BUTTONS_ACTION_LIKE = [
    'Unlike',
    'Cancel'
];
var CANCEL_INDEX_ACTION_LIKE = 1;

var BUTTONS_ACTION_MEDIA = [
    'Delete',
    'Cancel'
];
var CANCEL_INDEX_ACTION_MEDIA = 1;

const BUTTONS_ACTION_FOLLOWER_UNBLOCKED = [
    'UnBlock',
    'Cancel'
];
const CANCEL_INDEX_ACTION_FOLLOWER_UNBLOCKED = 1;

const BUTTONS_ACTION_REMOVE_WHITELIST = [
    'Remove from Whitelist',
    'Cancel'
];
const CANCEL_INDEX_ACTION__REMOVE_WHITELIST = 1;

const BUTTONS_INACTIVE = [
    '30 days',
    '60 days',
    '90 days',
    'Custom',
    'Cancel'
];
const CANCEL_BUTTONS_INACTIVE = 4;

const BUTTONS_GHOST_FILTER = [
    '50 posts',
    '100 posts',
    'Custom',
    'Cancel'
];
const CANCEL_BUTTONS_GHOST_FILTER = 3;

export {BUTTONS_SELECT, CANCEL_INDEX_SELECT, BUTTONS_ACTION,
    CANCEL_INDEX_ACTION,BUTTONS_LIST, CANCEL_INDEX_LIST, 
    BUTTONS_SELECT_LIKE, CANCEL_INDEX_SELECT_LIKE,BUTTONS_ACTION_LIKE, 
    CANCEL_INDEX_ACTION_LIKE, BUTTONS_ACTION_FOLLOWER, CANCEL_INDEX_ACTION_FOLLOWER, BUTTONS_ACTION_MEDIA, CANCEL_INDEX_ACTION_MEDIA, 
    BUTTONS_ACTION_FOLLOWER_UNBLOCKED, CANCEL_INDEX_ACTION_FOLLOWER_UNBLOCKED, BUTTONS_INACTIVE, CANCEL_BUTTONS_INACTIVE, 
    BUTTONS_ACTION_REMOVE_WHITELIST, CANCEL_INDEX_ACTION__REMOVE_WHITELIST, BUTTONS_GHOST_FILTER, CANCEL_BUTTONS_GHOST_FILTER, BUTTONS_SELECT_FOLLOWER }
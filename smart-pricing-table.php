<?php
/*
Plugin Name: Smart Pricing Table Builder
Plugin URI: https://github.com/yourgithub/smart-pricing-table
Description: Build beautiful responsive pricing tables with toggles, tooltips, export options, dark/light themes, and more.
Version: 1.0
Author: Your Name
Author URI: https://yourwebsite.com
License: GPL2
Text Domain: smart-pricing-table
*/

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Enqueue plugin styles and scripts
function sptb_enqueue_assets() {
    wp_enqueue_style('sptb-style', plugin_dir_url(__FILE__) . 'style.css');
    wp_enqueue_script('sptb-script', plugin_dir_url(__FILE__) . 'script.js', array('jquery'), null, true);
}
add_action('wp_enqueue_scripts', 'sptb_enqueue_assets');

// Register shortcode [smart_pricing_table]
function sptb_display_pricing_table() {
    ob_start();
    include plugin_dir_path(__FILE__) . 'templates/pricing-table.html';
    return ob_get_clean();
}
add_shortcode('smart_pricing_table', 'sptb_display_pricing_table');
?>

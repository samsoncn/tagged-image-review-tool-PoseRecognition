# [imglab](http://imglab.ml/)

A web based tool to label images for objects that can be used to train dlib or other object detectors.

[![first-timers-only](http://img.shields.io/badge/first--timers--only-friendly-blue.svg?style=flat-square)](http://www.firsttimersonly.com/)
[![Bountysource](https://img.shields.io/bountysource/team/imglab/activity.svg)](https://salt.bountysource.com/teams/imglab)
<div align="center"><img src="img/imglab_logo.png"  width="300px"></div>
The original version of imglab is careted by NaturalIntelligence and this is a modified version of imglab.

## Features

ImgLab is platform independent, runs directly from the browser, and has no prerequisites. It requires minimal CPU and memory.

## New Modified Features

* This ImgLab had been modified for full body PoseRecognition in a total of 15 keypoints, by following COCO dataset. The purpose of this feature is to allow users to collect data and get the data to for the AI machine learning tuning/training.
* Upload their previous dataset from the tool,then can check and fix for the images that had mistake or bad annotations.

If you don't know what COCO dataset is, check this out http://cocodataset.org/#home.

**Other features**:

* Special attention for dlib users. You can easily adjust the order of parts / landmarks / featurepoints.
* Open-source and free forever.
* You can draw feature points and shapes (circles, rectangles, polygons). Other shapes like ellipses, lines, curves will be added in the future if there is demand. 
* Multiple formats are supported
  * dlib XML
  * dlib pts
  * Pascal VOC
  * COCO
  * Tenserflow (in plan)
  
**Other quality-of-life features**:

* Drag or resize any annotation shape.
* Select and delete any annotation shape or landmark points.
* Arrange landmark points in specific order by dragging their label up & down, instead of creating them in a particular order.
* Autosave in browser cache. Export to save on disk.
* Hotkeys support for easy switching between images, tools, labelling data, or to access other parts of the application for added convenience.
* Set image opacity to highlight annotation shapes and points.
* Tracking lines and mouse coordinates for precise annotations.

Visit the [Features Documentation](/docs/features.md) for a complete list of the features.

## How to use

* [Importing images](/docs/guide.md/#import)

To install locally, head to the [Installation Guide](/docs/guide.md/#offline-installation).

### How to use Imglab's features:

* [Auto-suggestions](/docs/guide.md/#auto-suggestion)
* [Plug-ins](/docs/guide.md/#plugins) (Face++)
* [Creating shapes](/docs/guide.md/#different-shapes)
* [Keyboard Shortcuts](/docs/guide.md/#keyboard-shortcuts)
* [Zooming in/out](/docs/guide.md/#zoom-inout)

Check the [Demo Video](https://youtu.be/Y-bJo_ylHTw) tutorial/demonstration or the [User Guide](/docs/guide.md) for more details.

## Contributors

<a href="https://github.com/NaturalIntelligence/imglab/graphs/contributors"><img src="https://opencollective.com/imglab/contributors.svg?width=890&button=false" /></a>

"# tagged-image-review-tool-PoseRecognition" 

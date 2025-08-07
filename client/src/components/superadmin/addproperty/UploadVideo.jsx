import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  AlertCircle,
  CheckCircle,
  Camera,
  Film,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Info,
  Image
} from "lucide-react";

const UploadVideo = ({ prop, propdtl }) => {
  // Add navigation hook
  const navigate = useNavigate();
  
  console.log("UploadVideo prop:", prop, "propdtl:", propdtl);

  // State for video uploads and management
  const [videos, setVideos] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for image uploads
  const [images, setImages] = useState([]);
  const [isImageDragging, setIsImageDragging] = useState(false);
  const [imageUploadProgress, setImageUploadProgress] = useState({});
  const [imageErrors, setImageErrors] = useState({});

  // Video upload configurations
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoCategory, setVideoCategory] = useState("");
  const [videoTags, setVideoTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [videoPrivacy, setVideoPrivacy] = useState("public");
  const [thumbnailSelection, setThumbnailSelection] = useState("auto");
  const [customThumbnail, setCustomThumbnail] = useState(null);

  // Refs
  const fileInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);
  const imageInputRef = useRef(null);

  // Constants for videos
  const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
  const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/avi', 'video/mov', 'video/wmv'];
  const MAX_VIDEOS = 5;
  const MAX_DURATION = 600; // 10 minutes

  // Constants for images
  const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
  const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const MAX_IMAGES = 20;

  const categories = [
    "Property Tour",
    "Exterior Views",
    "Interior Features", 
    "Neighborhood",
    "Amenities",
    "Construction Progress",
    "Virtual Walkthrough",
    "Drone Footage"
  ];

  const privacyOptions = [
    { value: "public", label: "Public", desc: "Anyone can search for and view" },
    { value: "unlisted", label: "Unlisted", desc: "Anyone with the link can view" },
    { value: "private", label: "Private", desc: "Only you can view" }
  ];

  // Helper Functions
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const validateVideo = (file) => {
    const errors = [];
    
    if (!ACCEPTED_VIDEO_TYPES.includes(file.type)) {
      errors.push('Invalid file type. Please upload MP4, WebM, AVI, MOV, or WMV files.');
    }
    
    if (file.size > MAX_FILE_SIZE) {
      errors.push(`File size too large. Maximum size is ${formatFileSize(MAX_FILE_SIZE)}.`);
    }

    if (videos.length >= MAX_VIDEOS) {
      errors.push(`Maximum ${MAX_VIDEOS} videos allowed.`);
    }

    return errors;
  };

  const validateImage = (file) => {
    const errors = [];
    
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      errors.push('Invalid file type. Please upload JPEG, JPG, PNG, or WebP images.');
    }
    
    if (file.size > MAX_IMAGE_SIZE) {
      errors.push(`File size too large. Maximum size is ${formatFileSize(MAX_IMAGE_SIZE)}.`);
    }

    if (images.length >= MAX_IMAGES) {
      errors.push(`Maximum ${MAX_IMAGES} images allowed.`);
    }

    return errors;
  };

  // Video Event Handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleVideoFiles(files);
  };

  // Image Event Handlers
  const handleImageDragEnter = (e) => {
    e.preventDefault();
    setIsImageDragging(true);
  };

  const handleImageDragLeave = (e) => {
    e.preventDefault();
    setIsImageDragging(false);
  };

  const handleImageDragOver = (e) => {
    e.preventDefault();
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    setIsImageDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleImageFiles(files);
  };

  const handleVideoFiles = (files) => {
    files.forEach(file => {
      const validationErrors = validateVideo(file);
      if (validationErrors.length > 0) {
        setErrors(prev => ({
          ...prev,
          [file.name]: validationErrors.join(' ')
        }));
        return;
      }

      const videoId = Date.now() + Math.random();
      const videoElement = document.createElement('video');
      videoElement.preload = 'metadata';
      
      videoElement.onloadedmetadata = () => {
        const duration = videoElement.duration;
        
        if (duration > MAX_DURATION) {
          setErrors(prev => ({
            ...prev,
            [file.name]: `Video duration too long. Maximum ${MAX_DURATION/60} minutes allowed.`
          }));
          return;
        }

        const newVideo = {
          id: videoId,
          file: file,
          name: file.name,
          size: file.size,
          duration: duration,
          url: URL.createObjectURL(file),
          uploaded: false,
          progress: 0
        };

        setVideos(prev => [...prev, newVideo]);
        simulateUpload(videoId);
      };

      videoElement.src = URL.createObjectURL(file);
    });
  };

  const handleImageFiles = (files) => {
    files.forEach(file => {
      const validationErrors = validateImage(file);
      if (validationErrors.length > 0) {
        setImageErrors(prev => ({
          ...prev,
          [file.name]: validationErrors.join(' ')
        }));
        return;
      }

      const imageId = Date.now() + Math.random();
      
      const newImage = {
        id: imageId,
        file: file,
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file),
        uploaded: false,
        progress: 0
      };

      setImages(prev => [...prev, newImage]);
      simulateImageUpload(imageId);
    });
  };

  const simulateUpload = (videoId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setVideos(prev => 
          prev.map(video => 
            video.id === videoId 
              ? { ...video, uploaded: true, progress: 100 }
              : video
          )
        );
      }
      setUploadProgress(prev => ({ ...prev, [videoId]: progress }));
    }, 200);
  };

  const simulateImageUpload = (imageId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setImages(prev => 
          prev.map(image => 
            image.id === imageId 
              ? { ...image, uploaded: true, progress: 100 }
              : image
          )
        );
      }
      setImageUploadProgress(prev => ({ ...prev, [imageId]: progress }));
    }, 150);
  };

  const removeVideo = (videoId) => {
    setVideos(prev => prev.filter(video => video.id !== videoId));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[videoId];
      return newProgress;
    });
  };

  const removeImage = (imageId) => {
    setImages(prev => prev.filter(image => image.id !== imageId));
    setImageUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[imageId];
      return newProgress;
    });
  };

  const addTag = () => {
    if (newTag.trim() && !videoTags.includes(newTag.trim())) {
      setVideoTags([...videoTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setVideoTags(videoTags.filter(tag => tag !== tagToRemove));
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setCustomThumbnail(URL.createObjectURL(file));
    }
  };

  // Add form submission handler with navigation - UPDATED TO ALLOW EMPTY UPLOADS
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Collect all media data (can be empty arrays now)
      const mediaData = {
        videos: videos.map(video => ({
          id: video.id,
          name: video.name,
          size: video.size,
          duration: video.duration,
          uploaded: video.uploaded
        })),
        images: images.map(image => ({
          id: image.id,
          name: image.name,
          size: image.size,
          uploaded: image.uploaded
        })),
        videoConfiguration: {
          title: videoTitle,
          description: videoDescription,
          category: videoCategory,
          tags: videoTags,
          privacy: videoPrivacy,
          thumbnailSelection: thumbnailSelection,
          customThumbnail: customThumbnail
        },
        propertyType: propdtl,
        propertyData: prop
      };

      console.log('Media form submitted with data:', mediaData);
      
      // Here you would typically make an API call to save the media data
      // await saveMediaData(mediaData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to pricing page after successful submission
      navigate('/admin/add-products/pricing', { 
        state: { 
          mediaData: mediaData,
          propertyType: propdtl,
          propertyData: prop 
        } 
      });
      
    } catch (error) {
      console.error('Error submitting media form:', error);
      setErrors({ submit: 'Failed to save media files. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const ErrorMessage = ({ error }) =>
    error ? (
      <div className="flex items-center mt-2 text-red-600 text-sm">
        <AlertCircle className="w-4 h-4 mr-2" />
        {error}
      </div>
    ) : null;

  return (
    <div className="lg:col-span-8">
      <div className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-10">
        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 mb-4 sm:mb-6 lg:mb-8 flex flex-col xs:flex-row xs:items-center">
          <span>Add videos and images of your property</span>
          <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-2 xs:mt-0 xs:ml-2 sm:ml-4"></div>
        </h3>

        {/* Updated Media Upload Guidelines - Made Optional */}
        <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Media Guidelines (Optional)</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Adding videos and images significantly increases property views</li>
                <li>• Upload videos up to {formatFileSize(MAX_FILE_SIZE)} in format .mov, .mp4, .H264. Video duration should be less than {MAX_DURATION/60} mins</li>
                <li>• Upload images up to {formatFileSize(MAX_IMAGE_SIZE)} in format .jpg, .png, .webp</li>
                <li>• You can skip this step and add media later if needed</li>
                <li>• Make sure content follows the <button className="text-blue-600 underline">Media Guidelines</button></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Video Upload Area - Made Optional */}
          <div>
            <h4 className="text-lg font-semibold text-slate-800 mb-6">
              Upload Property Videos 
              <span className="text-sm font-normal text-slate-500 ml-2">(Optional)</span>
            </h4>
            
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                isDragging 
                  ? 'border-purple-400 bg-purple-50' 
                  : 'border-slate-300 hover:border-slate-400'
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                  <Film className="w-8 h-8 text-white" />
                </div>
                
                <h5 className="text-lg font-semibold text-slate-800 mb-2">
                  {isDragging ? 'Drop videos here' : 'Upload Property Videos (Optional)'}
                </h5>
                
                <p className="text-slate-600 mb-6 max-w-md">
                  Drag and drop your video files here, or click to browse and select files from your computer. You can skip this step if you don't have videos ready.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
                  >
                    <Upload className="w-5 h-5" />
                    Choose Videos
                  </button>
                  
                  <div className="text-sm text-slate-500 flex items-center">
                    <span>Max {MAX_VIDEOS} videos • Up to {formatFileSize(MAX_FILE_SIZE)} each</span>
                  </div>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={ACCEPTED_VIDEO_TYPES.join(',')}
                onChange={(e) => handleVideoFiles(Array.from(e.target.files))}
                className="hidden"
              />
            </div>
          </div>

          {/* Video Preview List */}
          {videos.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-6">Uploaded Videos ({videos.length}/{MAX_VIDEOS})</h4>
              
              <div className="space-y-4">
                {videos.map((video) => (
                  <div key={video.id} className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg bg-white shadow-sm">
                    <div className="relative">
                      <video
                        src={video.url}
                        className="w-20 h-16 object-cover rounded-lg"
                        muted
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h6 className="font-medium text-slate-800 truncate">{video.name}</h6>
                      <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                        <span>{formatFileSize(video.size)}</span>
                        <span>{formatDuration(video.duration)}</span>
                        <span className={`flex items-center gap-1 ${
                          video.uploaded ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {video.uploaded ? <CheckCircle className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
                          {video.uploaded ? 'Uploaded' : 'Uploading...'}
                        </span>
                      </div>
                      
                      {!video.uploaded && (
                        <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress[video.id] || 0}%` }}
                          />
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => removeVideo(video.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image Upload Area - Made Optional */}
          <div>
            <h4 className="text-lg font-semibold text-slate-800 mb-6">
              Upload Property Images 
              <span className="text-sm font-normal text-slate-500 ml-2">(Optional)</span>
            </h4>
            
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                isImageDragging 
                  ? 'border-green-400 bg-green-50' 
                  : 'border-slate-300 hover:border-slate-400'
              }`}
              onDragEnter={handleImageDragEnter}
              onDragLeave={handleImageDragLeave}
              onDragOver={handleImageDragOver}
              onDrop={handleImageDrop}
            >
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                  <Image className="w-8 h-8 text-white" />
                </div>
                
                <h5 className="text-lg font-semibold text-slate-800 mb-2">
                  {isImageDragging ? 'Drop images here' : 'Upload Property Images (Optional)'}
                </h5>
                
                <p className="text-slate-600 mb-6 max-w-md">
                  Drag and drop your image files here, or click to browse and select multiple images from your computer. You can skip this step if you don't have images ready.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => imageInputRef.current?.click()}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200"
                  >
                    <Upload className="w-5 h-5" />
                    Choose Images
                  </button>
                  
                  <div className="text-sm text-slate-500 flex items-center">
                    <span>Max {MAX_IMAGES} images • Up to {formatFileSize(MAX_IMAGE_SIZE)} each</span>
                  </div>
                </div>
              </div>

              <input
                ref={imageInputRef}
                type="file"
                multiple
                accept={ACCEPTED_IMAGE_TYPES.join(',')}
                onChange={(e) => handleImageFiles(Array.from(e.target.files))}
                className="hidden"
              />
            </div>
          </div>

          {/* Image Preview Grid */}
          {images.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-6">Uploaded Images ({images.length}/{MAX_IMAGES})</h4>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {images.map((image) => (
                  <div key={image.id} className="relative group">
                    <div className="aspect-square bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {!image.uploaded && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="text-center text-white">
                            <Upload className="w-6 h-6 mx-auto mb-1" />
                            <div className="text-xs">Uploading...</div>
                            <div className="w-16 bg-white/30 rounded-full h-1 mt-1">
                              <div
                                className="bg-white h-1 rounded-full transition-all duration-300"
                                style={{ width: `${imageUploadProgress[image.id] || 0}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {image.uploaded && (
                        <div className="absolute top-2 right-2">
                          <div className="bg-green-500 text-white rounded-full p-1">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => removeImage(image.id)}
                        className="absolute top-2 left-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="mt-2 text-center">
                      <p className="text-xs text-slate-600 truncate">{image.name}</p>
                      <p className="text-xs text-slate-500">{formatFileSize(image.size)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Video Information Section - Only show if videos are uploaded */}
          {videos.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-6">Video Information</h4>
              
              <div className="space-y-6">
                {/* Video Title */}
                <div>
                  <label className="block text-base font-medium text-slate-700 mb-3">
                    Video Title
                  </label>
                  <input
                    type="text"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="Enter a compelling title for your property video"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-300 focus:outline-none"
                    maxLength={100}
                  />
                  <div className="text-sm text-slate-500 mt-1">{videoTitle.length}/100 characters</div>
                </div>

                {/* Video Description */}
                <div>
                  <label className="block text-base font-medium text-slate-700 mb-3">
                    Description
                    <span className="text-sm font-normal text-slate-500 ml-2">(Optional)</span>
                  </label>
                  <textarea
                    value={videoDescription}
                    onChange={(e) => setVideoDescription(e.target.value)}
                    placeholder="Describe what viewers will see in your property video..."
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-300 focus:outline-none resize-none"
                    maxLength={500}
                  />
                  <div className="text-sm text-slate-500 mt-1">{videoDescription.length}/500 characters</div>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-base font-medium text-slate-700 mb-3">
                    Video Category
                  </label>
                  <select
                    value={videoCategory}
                    onChange={(e) => setVideoCategory(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-300 focus:outline-none bg-white"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-base font-medium text-slate-700 mb-3">
                    Tags
                    <span className="text-sm font-normal text-slate-500 ml-2">(Help people find your video)</span>
                  </label>
                  
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag"
                      className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-300 focus:outline-none"
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    />
                    <button
                      onClick={addTag}
                      className="px-4 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  {videoTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {videoTags.map((tag, index) => (
                        <span
                          key={index}
                          className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="hover:bg-purple-200 rounded-full p-1"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Privacy Settings */}
                <div>
                  <label className="block text-base font-medium text-slate-700 mb-3">
                    Privacy Settings
                  </label>
                  <div className="space-y-3">
                    {privacyOptions.map(option => (
                      <div
                        key={option.value}
                        className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          videoPrivacy === option.value 
                            ? 'border-purple-500 bg-purple-50' 
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                        onClick={() => setVideoPrivacy(option.value)}
                      >
                        <div className="mt-1">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            videoPrivacy === option.value 
                              ? 'border-purple-500 bg-purple-500' 
                              : 'border-slate-300'
                          }`}>
                            {videoPrivacy === option.value && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-slate-800">{option.label}</div>
                          <div className="text-sm text-slate-600">{option.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Thumbnail Selection */}
                <div>
                  <label className="block text-base font-medium text-slate-700 mb-3">
                    Video Thumbnail
                  </label>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <button
                        onClick={() => setThumbnailSelection('auto')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                          thumbnailSelection === 'auto' 
                            ? 'border-purple-500 bg-purple-50 text-purple-700' 
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        Auto-generate
                      </button>
                      
                      <button
                        onClick={() => setThumbnailSelection('custom')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                          thumbnailSelection === 'custom' 
                            ? 'border-purple-500 bg-purple-50 text-purple-700' 
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        <Camera className="w-4 h-4" />
                        Custom Upload
                      </button>
                    </div>

                    {thumbnailSelection === 'custom' && (
                      <div>
                        <input
                          ref={thumbnailInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleThumbnailUpload}
                          className="hidden"
                        />
                        
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => thumbnailInputRef.current?.click()}
                            className="px-4 py-2 border-2 border-slate-200 rounded-lg text-slate-600 hover:border-slate-300 transition-colors"
                          >
                            Choose Image
                          </button>
                          
                          {customThumbnail && (
                            <div className="relative">
                              <img
                                src={customThumbnail}
                                alt="Custom thumbnail"
                                className="w-20 h-16 object-cover rounded-lg"
                              />
                              <button
                                onClick={() => setCustomThumbnail(null)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {(Object.keys(errors).length > 0 || Object.keys(imageErrors).length > 0) && (
            <div className="space-y-2">
              {Object.entries(errors).map(([fileName, error]) => (
                <div key={fileName} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="font-medium text-red-800">Video: {fileName}</span>
                  </div>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              ))}
              {Object.entries(imageErrors).map(([fileName, error]) => (
                <div key={fileName} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="font-medium text-red-800">Image: {fileName}</span>
                  </div>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              ))}
            </div>
          )}

          {/* Show submission error if any */}
          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <ErrorMessage error={errors.submit} />
            </div>
          )}

          {/* Optional Media Note */}
          {videos.length === 0 && images.length === 0 && (
            <div className="text-center py-8 bg-slate-50 rounded-lg border border-slate-200">
              <div className="max-w-md mx-auto">
                <div className="w-12 h-12 bg-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Info className="w-6 h-6 text-slate-600" />
                </div>
                <h5 className="text-lg font-medium text-slate-700 mb-2">No Media Files Added</h5>
                <p className="text-slate-600 text-sm">
                  You can proceed without adding videos or images. Media files can be added later to enhance your property listing and attract more viewers.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button - UPDATED TO ALWAYS BE ENABLED */}
        <div className="flex justify-end pt-6 border-t border-slate-200 mt-8">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting} // Only disabled when submitting, not when empty
            className={`px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/25 ${
              isSubmitting
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </div>
            ) : (
              "Save & Continue"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;

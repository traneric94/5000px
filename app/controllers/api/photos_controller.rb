class Api::PhotosController < ApplicationController

  def index
    @photos = Photo.all
  end

  def create
    @photo = Photo.new(photo_params)
    @photo.author_id = current_user.id
    if @photo.save!
      @photos = Photo.all
      render :index
    else
      render json: @photo.errors.full_messages, status: 422
    end
  end

  def show
    @photo = Photo.find(params[:id])
  end


  def update
    @photo = Photo.find(params[:photo][:id])
    unless @photo && @photo.update_attributes(photo_params)
      render json: @photo.errors.full_messages, status: 400
    else
      @photos = Photo.all
      render :index
    end
  end

  def destroy
    @photo = Photo.find(params[:id])
    @photo ? @photo.destroy :
    (render json: ['Photo does not exist'], status: 410)
  end

  def feed
    @photos = Photo.all.page(params[:page]).per(10)
    render :index
  end

  def by_user
    @photos = Photo.where(author_id: params[:id])
    render :index
  end

  private

  def photo_params
    params.require(:photo).permit(:title, :description, :author_id, :image, :id)
  end

end

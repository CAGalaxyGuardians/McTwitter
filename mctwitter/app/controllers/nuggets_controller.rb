class NuggetsController < ApplicationController
  before_action :set_nugget, only: [:show, :edit, :update, :destroy]

  # GET /nuggets
  # GET /nuggets.json
  def index
    @nuggets = Nugget.order("created_at desc")
    # @nuggets = Nugget.all
  end

  # GET /nuggets/1
  # GET /nuggets/1.json
  def show
  end

  # GET /nuggets/new
  def new
    @nugget = current_user.nugget.build
  end

  # GET /nuggets/1/edit
  def edit
  end

  # POST /nuggets
  # POST /nuggets.json
  def create
    @nugget = current_user.nugget.build(nugget_params)

    respond_to do |format|
      if @nugget.save
        format.html { redirect_to @nugget, notice: 'Nugget was successfully created.' }
        format.json { render :show, status: :created, location: @nugget }
      else
        format.html { render :new }
        format.json { render json: @nugget.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /nuggets/1
  # PATCH/PUT /nuggets/1.json
  def update
    respond_to do |format|
      if @nugget.update(nugget_params)
        format.html { redirect_to @nugget, notice: 'Nugget was successfully updated.' }
        format.json { render :show, status: :ok, location: @nugget }
      else
        format.html { render :edit }
        format.json { render json: @nugget.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /nuggets/1
  # DELETE /nuggets/1.json
  def destroy
    @nugget.destroy
    respond_to do |format|
      format.html { redirect_to nuggets_url, notice: 'Nugget was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def upvote
    @nugget = Nugget.find(params[:id])
    @nugget.upvote_by current_user
    redirect_back fallback_location: root_path
  end

  def downvote
    @nugget = Nugget.find(params[:id])
    @nugget.downvote_by current_user
    redirect_back fallback_location: root_path
  end



  private
    # Use callbacks to share common setup or constraints between actions.
    def set_nugget
      @nugget = Nugget.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def nugget_params
      params.require(:nugget).permit(:name,:message)
    end
end

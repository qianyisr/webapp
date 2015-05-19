define 'app', ['jquery', 'underscore', 'backbone', 'backboneLocalStorage'], ($, _, Backbone) ->

  TodoModel = Backbone.Model.extend 
    defaults : () ->
      title : 'Untitle',
      done  : false,
      order : Todos.length+1

    initialize : () ->
      this.save()


  TodoList = Backbone.Collection.extend
    model : TodoModel
    localStorage : new Backbone.LocalStorage 'todos-backbone'
    done : () ->
      this.where done : true

  Todos = new TodoList  # todo 集合


  TodoV
  iew = Backbone.View.extend
    tagName  : 'div'  # 外容器
    template : _.template $('#todo-item-template').html()   # 模板HTML

    # 初始化，坚听对象
    initialize : () ->
      this.listenTo this.model, 'change',  this.render
      this.listenTo this.model, 'destroy', this.remove

    # 事件绑定
    events : 
      'click  button.todo-item-done'   : 'done'
      'click  button.todo-item-remove' : 'clear'
      'click  button.todo-item-undone' : 'undone'

    done : () ->
      if this.model.get('done') == false  # 本身是未完成状态的
        this.model.set done : true
        this.remove()

    undone : () ->
      if this.model.get('done') == true  # 本身是完成状态的
        this.model.set done : false
        this.remove()

    clear : () ->
      this.model.destroy()

    render : () ->
      this.$el.html this.template this.model.toJSON()
      return this

  AppView = Backbone.View.extend 
    # 初始化保存DOM对象
    initialize : () ->
      this.$input = this.$('.todo-input-text').focus()
      this.$todoList = this.$('.todo-undone-list')
      this.$todoDoneList = this.$('.todo-done-list')

      this.listenTo Todos, 'add',         this.addOne
      this.listenTo Todos, 'change:done', this.addOne

      Todos.fetch()

    events : 
      'keypress input.todo-input-text'    : 'createOnEnter'

    # Enter 时保存
    createOnEnter : (e) ->
      if e.keyCode != 13 
        return
      if !this.$input.val() 
        return;

      Todos.create title: this.$input.val()
      this.$input.val('')
      
    addOne : (todo) ->
      view = new TodoView  model : todo 
      if todo.get('done')
        # 已经完成的加入已完成列表
        this.$todoDoneList.append(view.render().el);
      else 
        # 未完成的加入未完成列表
        this.$todoList.append(view.render().el);   

      # Todos.each (todo) ->
      todo.save() 

  App = new AppView el : $('.todo-container')   # 主应用UI

  return init : () ->
    Backbone.history.start()
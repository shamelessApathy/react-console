<?php
class uri_router {
	public function load($uri)
	{
		if (isset($uri) && $uri != null)
		{
			// Remove the "/" pre-pending the URI
			$splode = explode('/',$uri);
			$controller = $splode[1];
			if ($controller === "")
			{
				require_once('views/view.home.php');
				return;
			}
			// Checks if a method is set to be called by the controller
			if (isset($splode[2]) && $splode[2] != null)
			{
				$method = $splode[2];
			}
			$controller_string = $controller . 'Controller.php';
			require_once(CONTROLLERS . "/".$controller_string);
			$controllerConcat = "$controller" . "Controller";
			$cont = new $controllerConcat();
			if (isset($method))
			{
				$cont->$method();
			}
		}
	}
}